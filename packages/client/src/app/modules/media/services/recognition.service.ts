import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Subject, auditTime, debounceTime, takeUntil, throttleTime } from 'rxjs';
import { AppPlatform, AppState } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { RecognitionActions, SpeechRecognition } from '../../../models/recognition.model';
import { platformSelector } from '../../../selectors/app.selector';
import { languageSelector } from '../../../selectors/settings.selector';
import { Language } from '../../settings/models/settings.model';
import { getWorker } from '../../../services/worker.util';
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
  private DEBOUNCE_TIME_MS = 150;
  private SEGMENTATION_DEBOUNCE_MS = 1500;
  private readonly MAX_RECOGNITION_LENGTH = 15;
  private historyWorker: Worker;
  private language: Signal<Language>;

  constructor(private store: Store<AppState>) {
    this.historyWorker = getWorker();
    this.historyWorker.addEventListener('message', ({data}) => {
      // console.log(data);
    })
    this.language = toSignal(this.store.select(languageSelector)) as Signal<Language>;
    this.platform = toSignal(this.store.select(platformSelector));
  }

  public connectToStream(streamId: string): void {
    if (this.platform() === AppPlatform.mobile) {
      this.DEBOUNCE_TIME_MS = 750;
      this.SEGMENTATION_DEBOUNCE_MS = 2500;
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
  }

  public getLiveOutput(streamId: string): Signal<string> {
    const liveOutput = this.liveOutputMap.get(streamId);
    if (!liveOutput) {
      throw new Error(`No live output signal for recognition stream id ${streamId}`);
    } else {
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
    const debounce$: Subject<void> = new Subject<void>()
    const disconnect$: Subject<void> = new Subject<void>();
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
          if (result.isFinal && result[0].transcript !== '' && !transcriptSegments.has(result)) {
            if (platform === AppPlatform.mobile) {
              // console.log('mobile!!!', result[0].confidence)
            } else {
              transcriptSegments.add(result);
            }
            return true;
          }
          return false;
        })
        .map((result: SpeechRecognitionResult) => result[0])
        .reduce((acc, alternative: SpeechRecognitionAlternative, idx) => {
          if (platform === AppPlatform.mobile) {
            // console.log('mobile platform!', alternative)
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
          recognizedText.update((current: string[]) => {
            current.push(partialTranscript);
            // this.historyWorker.postMessage({id: streamId, type: 'put', message: partialTranscript})
            return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
          });
          transcript = '';
          liveOutput.set('');
          debounce$.next();
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
      if (liveOutput() !== '') {
        // console.log('live output is not blank - stopping', liveOutput())
        recognition.stop();
      } else if (!this.activeRecognitionStreams.has(streamId)) {
        // console.log('recognition stream inactive - stopping')
        recognition.stop();
      } else {
        // console.log('not ending - liveoutput blank')
      }
    })

    recognition.addEventListener('result', (e: any) => {
      // console.log('result')
      debounce$.next();
      if (this.platform() === AppPlatform.desktop) {
        mostRecentResults = Array.from(e.results);
        transcript = mostRecentResults
        .filter((result: SpeechRecognitionResult) => !transcriptSegments.has(result))
        .map((result: SpeechRecognitionResult) => {
          return result[0];
        })
        // TODO: Allow adjustment of confidence threshold
        .filter((result: SpeechRecognitionAlternative) => {
          return result.transcript.length && result.confidence > 0;
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
      liveOutput.set(transcript);
    });

    recognition.addEventListener('end', (e) => {
      // console.log('end', Date.now())
      mostRecentResults = undefined;
      const mostRecentOutput = liveOutput();
      // console.log('mostRecentOutput', mostRecentOutput);
      transcriptSegments.clear();
      if (mostRecentOutput !== '') {
        recognizedText.update((current: string[]) => {
          current.push(mostRecentOutput);
          // this.historyWorker.postMessage({id: streamId, type: 'put', message: mostRecentOutput})
          return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
        });
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

    recognition.addEventListener('error', (err: any) => {
      console.log('recognition error', err.message);
      console.error(err);
      if (err.error === 'no-speech') {
        if (liveOutput() !== '') {
          liveOutput.set('');
        // } else if (recognizedText().length) {
        //   recognizedText.update((previous) => previous.slice(0, previous.length - 1))
        }
        return;
      // } else if (err.error === 'aborted' && this.activeRecognitionStreams.has(streamId)) {
      //   console.log('supressing aborted error, still acive');
      //   return;
      }
      this.activeRecognitionStreams.delete(streamId);
      // console.log('stopping due to error');
      recognition.stop();
      this.store.dispatch(AudioStreamActions.audioStreamError({ error: err.error }))
      this.store.dispatch(RecognitionActions.recognitionError({ error: err.error }))
    });

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
