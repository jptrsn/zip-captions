import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { RecognitionActions, SpeechRecognition } from '../../../models/recognition.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
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

  private readonly MAX_RECOGNITION_LENGTH = 5;
  private historyWorker: Worker;

  constructor(private store: Store<AppState>) {
    this.historyWorker = new Worker(new URL('../workers/recognition-history.worker', import.meta.url));
    this.historyWorker.addEventListener('message', ({data}) => {
      // console.log(data);
    })
  }

  public connectToStream(streamId: string): void {
    console.log('recognize stream', streamId);
    const recog: SpeechRecognition = new webkitSpeechRecognition();
    recog.interimResults = true;
    recog.continuous = true;

    // TODO: Replace language from settings
    recog.lang = 'en';
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
    const recognizedText = signal<string[]>([]);
    this.recognizedTextMap.set(streamId, recognizedText);
    
    const liveOutput = signal('');
    this.liveOutputMap.set(streamId, liveOutput);

    let transcript: string;

    // Debounce is to provide a timeout after the last-recognized full text, 
    // in order to better handle chunking in related tasks for the media stream
    // TODO: Allow adjustment of debounce
    const debounce$: Subject<void> = new Subject<void>()
    const disconnect$: Subject<void> = new Subject<void>();
    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(1750),
    ).subscribe(() => {
      console.log('debounce!', transcript);
      recognition.stop();
    });

    recognition.addEventListener('speechend', () => recognition.stop())

    recognition.addEventListener('result', (e: any) => {
      transcript = Array.from(e.results)
      .map((result: any) => result[0])
      // TODO: Allow adjustment of confidence threshold
      .filter((result: any) => {
        if (result.confidence === 0) {
          console.log('no confidence result');
        }
        return result.confidence > 0;
      })
      .map((result) => result.transcript)
      .join('');
      liveOutput.set(transcript);
      debounce$.next();
    });

    recognition.addEventListener('end', () => {
      console.log('end')
      if (this.activeRecognitionStreams.has(streamId)) {
        console.log('recognition still active, restarting')
        recognition.start();
      } else {
        console.log('recognition inactive, disconnecting')
        disconnect$.next();
      }
      const mostRecentOutput = liveOutput();
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
        liveOutput.set('');
        return;
      }
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
      this.store.dispatch(AudioStreamActions.audioStreamError({ error: err.error }))
      this.store.dispatch(RecognitionActions.recognitionError({ error: err.error }))
    });
  }
}
