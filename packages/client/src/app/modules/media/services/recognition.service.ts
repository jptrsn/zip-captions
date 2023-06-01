import { Injectable, WritableSignal, signal } from '@angular/core';
import { SpeechRecognition, SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from 'dom-speech-recognition';
import { Subject, debounceTime, takeUntil } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  private recognitionMap: Map<string, SpeechRecognition> = new Map();
  private activeRecognitionStreams: Set<string> = new Set();
  private recognizedTextMap: Map<string, WritableSignal<string>> = new Map();
  private liveOutputMap: Map<string, WritableSignal<string>> = new Map();

  public connectToStream(streamId: string): void {
    const recog: SpeechRecognition = new SpeechRecognition();
    this.recognitionMap.set(streamId, recog);
    this.activeRecognitionStreams.add(streamId);
    this._addEventListeners(streamId, recog);
  }

  public disconnectFromStream(streamId: string): void {
    const recognition = this.recognitionMap.get(streamId);
    if (recognition) {
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
    }
  }

  private _addEventListeners(streamId: string, recognition: SpeechRecognition): void {
    const recognizedText = signal('');
    this.recognizedTextMap.set(streamId, recognizedText);
    
    const liveOutput = signal('');
    this.liveOutputMap.set(streamId, liveOutput);

    let transcript: string;

    // Debounce is to provide a timeout after the last-recognized full text, 
    // in order to better handle chunking in related tasks for the media stream
    // 
    const debounce$: Subject<void> = new Subject<void>()
    const disconnect$: Subject<void> = new Subject<void>();
    debounce$.pipe(
      takeUntil(disconnect$),
      debounceTime(750),
    ).subscribe(() => recognition.stop())

    recognition.addEventListener('result', (e: SpeechRecognitionEvent) => {
      console.log('result', e)
      if (e.results.length === 1 && e.results[0].isFinal) {
        console.log('final transcript', e.results[0][0].transcript)
        recognizedText.set(e.results[0][0].transcript);
        liveOutput.set('');
      } else {
        transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
        liveOutput.set(transcript);
      }
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
    });

    recognition.addEventListener('error', (err: SpeechRecognitionErrorEvent) => {
      console.log('recognition error', err);
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
    });
  }
}
