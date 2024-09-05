import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Subject, auditTime, debounceTime, delay, map, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { ObsActions } from '../../../actions/obs.actions';
import { AppPlatform, AppState, BrowserPlatform } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { SpeechRecognition } from '../../../models/recognition.model';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { browserSelector, platformSelector } from '../../../selectors/app.selector';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { languageSelector, selectRenderHistoryLength, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { Language } from '../../settings/models/settings.model';
// TODO: Fix missing definitions once https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1560 is resolved
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  private recognitionMap: Map<string, SpeechRecognition> = new Map();
  private activeRecognitionStreams: Set<string> = new Set();
  private recognizedTextMap: Map<string, WritableSignal<string[]>> = new Map();
  private liveOutputMap: Map<string, WritableSignal<string>> = new Map();
  private platform: Signal<AppPlatform | undefined>;
  private browser: Signal<BrowserPlatform | undefined>;
  private DEBOUNCE_TIME_MS = 250;
  private SEGMENTATION_DEBOUNCE_MS = 1500;
  private NETWORK_ERROR_DEBOUNCE_MS = 1500;
  private readonly MAX_RECOGNITION_LENGTH = 15;
  private language: Signal<Language>;
  private obsConnected: Signal<boolean | undefined>;
  private resultCount: Signal<number | undefined>;
  private transcriptionEnabled: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>) {
    this.language = toSignal(this.store.select(languageSelector)) as Signal<Language>;
    this.platform = toSignal(this.store.select(platformSelector));
    this.browser = toSignal(this.store.select(browserSelector));
    this.obsConnected = toSignal(this.store.pipe(select(selectObsConnected), map((status) => status === ObsConnectionState.connected)));
    this.resultCount = toSignal(this.store.select(selectRenderHistoryLength));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled))
  }

  public connectToStream(streamId: string): void {
    if (this.platform() === AppPlatform.mobile) {
      this.DEBOUNCE_TIME_MS = 2500;
      this.SEGMENTATION_DEBOUNCE_MS = 10000;
    } else if (this.resultCount() === 0) {
      this.DEBOUNCE_TIME_MS = 1000;
      this.SEGMENTATION_DEBOUNCE_MS = 1000;
    }

    // console.log('recognize stream', streamId);
    const recog: SpeechRecognition = new webkitSpeechRecognition();
    recog.interimResults = true;
    recog.continuous = true;

    recog.lang = this.language();
    this.recognitionMap.set(streamId, recog);
    this.activeRecognitionStreams.add(streamId);
    this._addEventListeners(streamId, recog);
    // this._debugAllEventListeners(recog);
    recog.start();
    // console.log('started', streamId);
  }

  public disconnectFromStream(streamId: string): void {
    // console.log(`disconnect from stream ${streamId}`)
    const recognition = this.recognitionMap.get(streamId);
    if (recognition) {
      // console.log('found in map - stopping', streamId)
      this.activeRecognitionStreams.delete(streamId);
      this.recognitionMap.delete(streamId);
      recognition.stop();
    }
    if (this.transcriptionEnabled()) {
      this.store.dispatch(RecognitionActions.finalizeTranscript());
    }
  }

  public pauseRecognition(): void {
    this.recognitionMap.forEach((recog: SpeechRecognition, streamId: string) => {
      this.activeRecognitionStreams.delete(streamId);
      recog.stop();
    })
  }

  public resumeRecognition(): void {
    this.recognitionMap.forEach((recog: SpeechRecognition, streamId: string) => {
      this.activeRecognitionStreams.add(streamId);
      recog.start();
    })
  }

  public getLiveOutput(streamId: string): Signal<string> {
    const liveOutput = this.liveOutputMap.get(streamId);
    if (!liveOutput) {
      throw new Error(`No live output signal for recognition stream id ${streamId}`);
    } else {
      // TODO: Remove after dev
      // return signal<string>('This is a long sentence and should give us an idea of how to address the overflow when text size is set to maximum.') as Signal<string>
      return liveOutput;
    }
  }

  getRecognizedText(streamId: string): Signal<string[]> {
    const recognizedTextOutput = this.recognizedTextMap.get(streamId);
    if (!recognizedTextOutput) {
      throw new Error(`Recognized text output signal not found for stream id ${streamId}`);
    } else {
      return recognizedTextOutput;
    }
  }

  private _addEventListeners(streamId: string, recognition: SpeechRecognition): void {
    const platform: AppPlatform | undefined = this.platform();
    const recognizedText = signal<string[]>([]);
    this.recognizedTextMap.set(streamId, recognizedText);
    
    const liveOutput = signal('');
    this.liveOutputMap.set(streamId, liveOutput);
    
    let transcript: string;
    let mostRecentResults: SpeechRecognitionResult[] | undefined;
    const transcriptSegments: Set<SpeechRecognitionResult> = new Set<SpeechRecognitionResult>();

    // Debounce is to provide a timeout after the last-recognized full text, 
    // in order to better handle chunking in related tasks for the media stream
    // TODO: Allow adjustment of debounce
    const debounce$: Subject<number> = new Subject<number>()
    const disconnect$: Subject<void> = new Subject<void>();

    // Network error observable is used to debounce intermittent network issues that interrupt connection to the recognition server without going offline fully
    const networkError$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    let segmentStart: Date | undefined;
    // Live results logic
    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(this.DEBOUNCE_TIME_MS),
      throttleTime(this.DEBOUNCE_TIME_MS, undefined, { leading: false, trailing: true }),
      auditTime(this.DEBOUNCE_TIME_MS),
    ).subscribe(() => {
      // console.log('debounce ended', Date.now());
      if (mostRecentResults) {
        const partialTranscript: string = mostRecentResults
        .filter((result) => {
          if (streamId === 'stream') {
            return result[0].transcript !== '';
          } else if (result.isFinal && result[0].transcript !== '' && !transcriptSegments.has(result)) {
            if (platform !== AppPlatform.mobile) {
              transcriptSegments.add(result);
            }
            return true;
          }
          return false;
        })
        .map((result: SpeechRecognitionResult) => result[0])
        .reduce((acc, alternative: SpeechRecognitionAlternative, idx) => {
          if (platform === AppPlatform.mobile) {
            acc.push(alternative);
          } else if (alternative.confidence > 0) {
            acc.push(alternative)
          }
          return acc;
        }, [] as SpeechRecognitionAlternative[])
        .map((alternative) => alternative.transcript)
        .join('')
        .trim();
        if (partialTranscript !== '') {
          if (!segmentStart) {
            segmentStart = new Date();
          }
          recognizedText.update((current: string[]) => {
            current.push(partialTranscript);
            if (this.transcriptionEnabled()) {
              // console.log('segmentStart', segmentStart)
              this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: partialTranscript, start: segmentStart }))
              segmentStart = undefined;
            }
            // this.historyWorker.postMessage({id: streamId, type: 'put', message: partialTranscript})
            // console.log('partialTranscript', partialTranscript)
            return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
          });
          transcript = '';
          liveOutput.set('');
          debounce$.next(Date.now());
        }
      }
    });

    // Segmentation delay and logic
    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(this.SEGMENTATION_DEBOUNCE_MS),
      throttleTime(this.SEGMENTATION_DEBOUNCE_MS, undefined, { leading: false, trailing: true }),
      auditTime(this.SEGMENTATION_DEBOUNCE_MS),
    ).subscribe(() =>{
      if (liveOutput() == '') {
        console.log('live output blank')
        if (this.platform() === AppPlatform.desktop) {
          console.log('restarting recognition');
          recognition.stop();
        }
      } else if (!this.activeRecognitionStreams.has(streamId)) {
        // console.log('recognition stream inactive - stopping')
        recognition.stop();
      }
    });

    recognition.addEventListener('result', (e: any) => {
      // console.log('result', e.results[0][0])
      debounce$.next(Date.now());
      if (this.platform() === AppPlatform.desktop) {
        mostRecentResults = Array.from(e.results);
        transcript = mostRecentResults
        .filter((result: SpeechRecognitionResult) => !transcriptSegments.has(result))
        .map((result: SpeechRecognitionResult) => {
          return result[0];
        })
        .filter((result: SpeechRecognitionAlternative) => {
          // if (this.platform() === AppPlatform.desktop && this.browser() === BrowserPlatform.blink) {
          //   return result.transcript.length && result.confidence > 0;
          // }
          return result.transcript.length;
        })
        .map((result) => result.transcript)
        .join('');
      } else {
        const lastResult = e.results.item(e.results.length - 1);
        mostRecentResults = [lastResult];
        if (lastResult[0].transcript.length) {
          transcript = lastResult[0].transcript
        }
      }
      if (transcript.length && !segmentStart) {
        segmentStart = new Date();
      }
      liveOutput.set(transcript);
      if (this.obsConnected()) {
        this.store.dispatch(ObsActions.sendCaption({text: transcript}));
      }
    });

    recognition.addEventListener('end', (e) => {
      // console.log('end', Date.now())
      mostRecentResults = undefined;
      const mostRecentOutput = liveOutput();
      transcriptSegments.clear();
      if (mostRecentOutput !== '') {
        recognizedText.update((current: string[]) => {
          current.push(mostRecentOutput);
          // this.historyWorker.postMessage({id: streamId, type: 'put', message: mostRecentOutput})
          return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
        });
        if (this.transcriptionEnabled()) {
          this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: mostRecentOutput, start: segmentStart }))
          segmentStart = undefined;
        }
        // console.log('clearing live output');
        liveOutput.set('');
        transcript = '';
      }
      if (this.activeRecognitionStreams.has(streamId)) {
        // console.log('recognition still active, restarting')
        recognition.start();
      } else {
        // console.log('recognition inactive, disconnecting')
        disconnect$.next();
      }
    });

    networkError$.pipe(
      takeUntil(disconnect$),
      auditTime(this.NETWORK_ERROR_DEBOUNCE_MS),
      delay(1500),
      withLatestFrom(debounce$)
    ).subscribe(([errTimestamp, resultTimestamp]) => {
      // console.log(`err: ${new Date(errTimestamp).toTimeString()}, result: ${new Date(resultTimestamp).toTimeString()}`)
      if (errTimestamp > resultTimestamp) {
        recognition.stop();
        this._handleRecognitionError(streamId, { error: "network"});
      }
    })

    recognition.addEventListener('error', (err: any) => {
      console.log('recognition error', err)
      if (err.error === 'network') {
        // Use backoff to retry recognition
        networkError$.next(Date.now());
        return;
      } else if (networkError$.value) {
        networkError$.next(0);
      }
      if (err.error === 'no-speech') {
        if (liveOutput() !== '') {
          liveOutput.set('');
        }
        return;
      }
      this._handleRecognitionError(streamId, err);
      recognition.stop();
    });

  }

  private _handleRecognitionError(streamId: string, err: any) {
    console.warn('recognition error', err);
    this.activeRecognitionStreams.delete(streamId);
    this.store.dispatch(RecognitionActions.disconnect({id: streamId}))
    this.store.dispatch(AudioStreamActions.audioStreamError({ error: err.error }))
    this.store.dispatch(RecognitionActions.error({ error: err.error }))
    if (this.transcriptionEnabled()) {
      this.store.dispatch(RecognitionActions.finalizeTranscript())
    }
  }

  private _debugAllEventListeners(recognition: SpeechRecognition): void {
    const events: string[] = [
      'audioend', 
      'audiostart', 
      'end', 
      'error', 
      'nomatch', 
      'result', 
      'soundend', 
      'soundstart', 
      'speechend', 
      'speechstart', 
      'start'
    ]
    for (const ev of events) {
      recognition.addEventListener(ev, (e: any) => console.log(ev, e));
    }
  }
}
