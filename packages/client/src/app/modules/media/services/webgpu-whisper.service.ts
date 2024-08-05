import { Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';
import { getWhisperWorker } from '../../../services/worker.util';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { languageSelector } from '../../../selectors/settings.selector';
import { Language } from '../../settings/models/settings.model';
@Injectable({
  providedIn: 'root'
})
export class WebgpuWhisperService {

  private readonly whisper: Worker;
  private readonly IS_WEBGPU_AVAILBLE: boolean;
  private readonly WHISPER_SAMPLING_RATE = 16_000;
  private readonly MAX_AUDIO_LENGTH_SECONDS = 30;
  private readonly MAX_SAMPLES: number;
  
  
  // Model loading and progress
  private progressItems: WritableSignal<any[]> = signal([]);
  public loadingMessage: WritableSignal<string> = signal('uninitialized');
  public status: WritableSignal<string> = signal('');
  
  // Inputs and outputs
  private text: WritableSignal<string> = signal('');
  private tps: WritableSignal<any> = signal(null);
  private language: Signal<Language | undefined>;
  
  // Processing
  public recording: WritableSignal<boolean> = signal(false);
  public isProcessing: WritableSignal<boolean> = signal(false);
  private chunks: WritableSignal<any[]> = signal([]);
  private stream: Signal<MediaStream | null>;
  private recorder?: MediaRecorder;
  private audioContext?: AudioContext;
  
  constructor(private store: Store<AppState>) { 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore gpu is defined when enabled on compatible browsers
    this.IS_WEBGPU_AVAILBLE = !!navigator.gpu;
    this.MAX_SAMPLES = this.WHISPER_SAMPLING_RATE * this.MAX_AUDIO_LENGTH_SECONDS

    this.language = toSignal(this.store.select(languageSelector))
    this.stream = this._getMediaStream();
    this.whisper = getWhisperWorker();
    this.whisper.addEventListener('message', ({data}) => {
      console.log(`whisper message received: ${data}`);
      this._onMessageReceived(data);
    });

    effect(() => {
      const chunks = this.chunks();
      if (chunks.length) {
        const blob = new Blob(chunks, { type: this.recorder?.mimeType })
        const fileReader = new FileReader();

        fileReader.onloadend = async () => {
          const arrayBuffer = fileReader.result as ArrayBuffer;
          const decoded = await this.audioContext!.decodeAudioData(arrayBuffer);
          let audio = decoded.getChannelData(0);
          if (audio.length > this.MAX_SAMPLES) {
            audio = audio.slice(-this.MAX_SAMPLES);
          }

          this.whisper.postMessage({ type: 'generate', data: { audio, language: 'en' }});
        }

        fileReader.readAsArrayBuffer(blob);
      } else if (this.recorder) {
        this.recorder.requestData();
      }
    });
    
    this.stream();
    this.status.set('constructed');
  }
  
  startRecognition() {
    console.log('start whisper')
    if (this.recorder) {
      this.recorder.start();
    } else {
      console.log('no recorder')
    }
  }

  stopRecognition() {
    console.log('stop whisper')
    this.recorder?.stop();
  }

  private _getMediaStream(): Signal<MediaStream | null> {
    const sig: WritableSignal<MediaStream | null> = signal(null)
    navigator.mediaDevices.getUserMedia({video: false, audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1
    } }).then((stream: MediaStream) => {
      sig.set(stream);
      this.recorder = new MediaRecorder(stream);
      this.audioContext = new AudioContext({ sampleRate: this.WHISPER_SAMPLING_RATE })
      
      this.recorder.onstart = () => {
        this.recording.set(true);
        this.chunks.set([]);
      }

      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.chunks.update((prev) => [...prev, e.data]);
        } else {
          // Empty chunk received, so we request new data after a short timeout
          setTimeout(() => {
            this.recorder?.requestData();
          }, 25);
        }
      }

      this.recorder.onstop = () => {
        this.recording.set(false);
      }
    })
    return sig;
  }

  private _onMessageReceived(data: any) {
    switch (data.status) {
      case 'loading':
          // Model file start load: add a new progress item to the list.
          this.status.set('loading');
          this.loadingMessage.set(data.data);
          break;

        case 'initiate':
          this.progressItems.update(prev => [...prev, data]);
          break;

        case 'progress':
          // Model file progress: update one of the progress items.
          this.progressItems.update(
            prev => prev.map(item => {
              if (item.file === data.file) {
                return { ...item, ...data }
              }
              return item;
            })
          );
          break;

        case 'done':
          // Model file loaded: remove the progress item from the list.
          this.progressItems.update(
            prev => prev.filter(item => item.file !== data.file)
          );
          break;

        case 'ready':
          // Pipeline ready: the worker is ready to accept messages.
          this.status.set('ready');
          this.recorder?.start();
          break;

        case 'start': {
          // Start generation
          this.isProcessing.set(true);

          // Request new data from the recorder
          this.recorder?.requestData();
        }
          break;

        case 'update': {
          // Generation update: update the output text.
          const { tps } = data;
          this.tps.set(tps);
        }
          break;

        case 'complete':
          // Generation complete: re-enable the "Generate" button
          this.isProcessing.set(false);
          this.text.set(data.output);
          break;
      }
  }
}
