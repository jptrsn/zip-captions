import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { RecognitionActions, SpeechRecognition } from '../../../models/recognition.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { $localize } from '@angular/localize/init';
import { Language } from '../../settings/models/settings.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { languageSelector } from '../../../selectors/settings.selector';
import { platformSelector } from '../../../selectors/app.selector';
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
  private platform: Signal<string | undefined>;
  private readonly DEBOUNCE_TIME_MS = 150;
  private readonly SEGMENTATION_DEBOUNCE_MS = 1500;
  private readonly MAX_RECOGNITION_LENGTH = 5;
  private historyWorker: Worker;
  private language: Signal<Language>;

  constructor(private store: Store<AppState>) {
    this.historyWorker = new Worker(new URL('../workers/recognition-history.worker', import.meta.url));
    this.historyWorker.addEventListener('message', ({data}) => {
      // console.log(data);
    })
    this.language = toSignal(this.store.select(languageSelector)) as Signal<Language>;
    this.platform = toSignal(this.store.select(platformSelector));
  }

  public connectToStream(streamId: string): void {
    console.log('recognize stream', streamId, this.platform());
    const recog: SpeechRecognition = new webkitSpeechRecognition();
    recog.interimResults = true;
    recog.continuous = true;

    recog.lang = this.language();
    this.recognitionMap.set(streamId, recog);
    this.activeRecognitionStreams.add(streamId);
    this._addEventListeners(streamId, recog);
    recog.start();
  }

  public disconnectFromStream(streamId: string): void {
    const recognition = this.recognitionMap.get(streamId);
    if (recognition) {
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
    }
  }

  public getLiveOutput(streamId: string): Signal<string> {
    const liveOutput = this.liveOutputMap.get(streamId);
    if (!liveOutput) {
      throw new Error($localize`No live output signal for recognition stream id ${streamId}`);
    } else {
      return liveOutput;
    }
  }

  getRecognizedText(streamId: string): Signal<string[]> {
    const recognizedTextOutput = this.recognizedTextMap.get(streamId);
    if (!recognizedTextOutput) {
      throw new Error($localize`Recognized text output signal not found for stream id ${streamId}`);
    } else {
      return recognizedTextOutput;
    }
  }

  private _addEventListeners(streamId: string, recognition: SpeechRecognition): void {
    const recognizedText = signal<string[]>([]);
    this.recognizedTextMap.set(streamId, recognizedText);
    
    const liveOutput = signal('');
    this.liveOutputMap.set(streamId, liveOutput);

    let transcript: string;
    let mostRecentResults: SpeechRecognitionResultList | undefined;
    const transcriptSegments: Set<SpeechRecognitionResult> = new Set<SpeechRecognitionResult>();

    // Debounce is to provide a timeout after the last-recognized full text, 
    // in order to better handle chunking in related tasks for the media stream
    // TODO: Allow adjustment of debounce
    const debounce$: Subject<void> = new Subject<void>()
    const disconnect$: Subject<void> = new Subject<void>();
    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(this.DEBOUNCE_TIME_MS),
    ).subscribe(() => {
      if (mostRecentResults) {
        const partialTranscript: string = Array.from(mostRecentResults)
        .filter((result) => {
          if (result.isFinal && result[0].transcript !== '' && !transcriptSegments.has(result)) {
            transcriptSegments.add(result);
            return true;
          }
          return false;
        })
        .map((result: SpeechRecognitionResult) => result[0])
        // .filter((alternative: SpeechRecognitionAlternative) => (alternative.confidence > 0))
        .map((alternative) => alternative.transcript)
        .join('')
        .trim();
        if (partialTranscript !== '') {
          console.log('debounce!', partialTranscript);
          recognizedText.update((current: string[]) => {
            current.push(partialTranscript);
            this.historyWorker.postMessage({id: streamId, type: 'put', message: partialTranscript})
            return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
          });
          console.log('clearing live output')
          liveOutput.set('');
          debounce$.next();
        }
      }
    });

    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(this.SEGMENTATION_DEBOUNCE_MS)
    ).subscribe(() =>{ 
      if (liveOutput() !== '') {
        recognition.stop();
      } else {
        console.log('not ending - liveoutput blank')
      }
    })

    // recognition.addEventListener('speechend', () => recognition.stop())

    recognition.addEventListener('result', (e: any) => {
      console.log('result')
      debounce$.next();
      mostRecentResults = e.results;
      transcript = Array.from(e.results as SpeechRecognitionResultList)
      .filter((result: SpeechRecognitionResult) => !transcriptSegments.has(result))
      .map((result: SpeechRecognitionResult) => {
        return result[0];
      })
      // TODO: Allow adjustment of confidence threshold
      .filter((result: SpeechRecognitionAlternative) => {
        if (result.confidence === 0) {
          console.log('no confidence result');
        }
        return result.transcript.length && result.confidence > 0;
      })
      .map((result) => result.transcript)
      .join('')
      liveOutput.set(transcript);
    });

    recognition.addEventListener('end', () => {
      console.log('end', Date.now())
      mostRecentResults = undefined;
      if (this.activeRecognitionStreams.has(streamId)) {
        console.log('recognition still active, restarting')
        recognition.start();
      } else {
        console.log('recognition inactive, disconnecting')
        disconnect$.next();
      }
      const mostRecentOutput = liveOutput();
      transcriptSegments.clear();
      if (mostRecentOutput !== '') {
        recognizedText.update((current: string[]) => {
          current.push(mostRecentOutput);
          this.historyWorker.postMessage({id: streamId, type: 'put', message: mostRecentOutput})
          return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
        });
        liveOutput.set('')
      }
    });

    recognition.addEventListener('error', (err: any) => {
      console.log('recognition error', err);
      if (err.error === 'no-speech') {
        if (liveOutput() !== '') {
          liveOutput.set('');
        } else if (recognizedText().length) {
          recognizedText.update((previous) => previous.slice(0, previous.length - 1))
        }
        return;
      }
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
      this.store.dispatch(AudioStreamActions.audioStreamError({ error: err.error }))
      this.store.dispatch(RecognitionActions.recognitionError({ error: err.error }))
    });
  }
}
