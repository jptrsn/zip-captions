import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
// TODO: Fix missing definitions once https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1560 is resolved
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  private recognitionMap: Map<string, typeof SpeechRecognition> = new Map();
  private activeRecognitionStreams: Set<string> = new Set();
  private recognizedTextMap: Map<string, WritableSignal<string>> = new Map();
  private liveOutputMap: Map<string, WritableSignal<string>> = new Map();

  public connectToStream(streamId: string): void {
    const recog: typeof SpeechRecognition = new SpeechRecognition();
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

  public getLiveOutput(streamId: string): Signal<string> {
    const liveOutput = this.liveOutputMap.get(streamId);
    if (!liveOutput) {
      throw new Error(`No live output signal for recognition stream id ${streamId}`);
    } else {
      return liveOutput;
    }
  }

  getRecognizedText(streamId: string): Signal<string> {
    const recognizedTextOutput = this.recognizedTextMap.get(streamId);
    if (!recognizedTextOutput) {
      throw new Error(`Recognized text output signal not found for stream id ${streamId}`);
    } else {
      return recognizedTextOutput;
    }
  }

  private _addEventListeners(streamId: string, recognition: typeof SpeechRecognition): void {
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

    recognition.addEventListener('result', (e: any) => {
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

    recognition.addEventListener('error', (err: any) => {
      console.log('recognition error', err);
      this.activeRecognitionStreams.delete(streamId);
      recognition.stop();
    });
  }
}
