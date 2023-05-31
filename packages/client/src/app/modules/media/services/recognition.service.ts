import { Injectable, WritableSignal, signal } from '@angular/core';
import { SpeechRecognition, SpeechRecognitionEvent } from 'dom-speech-recognition';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  private recognitionMap: Map<string, SpeechRecognition> = new Map();
  private recognizedTextMap: Map<string, WritableSignal<string>> = new Map();
  private liveOutputMap: Map<string, WritableSignal<string>> = new Map();

  public connectToStream(streamId: string): void {
    const recog: SpeechRecognition = new SpeechRecognition();
    this.recognitionMap.set(streamId, recog);
    this._addEventListeners(streamId, recog);
  }

  private _addEventListeners(streamId: string, recognition: SpeechRecognition): void {
    const recognizedText = signal('')
    this.recognizedTextMap.set(streamId, recognizedText);

    const liveOutput = signal('');
    this.liveOutputMap.set(streamId, liveOutput);

    let transcript: string;

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
  }
}
