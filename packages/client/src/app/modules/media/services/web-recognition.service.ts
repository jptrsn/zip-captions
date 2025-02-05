import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Subject, auditTime, debounceTime, delay, map, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { ObsActions } from '../../../actions/obs.actions';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { AppPlatform, AppState } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { SpeechRecognition } from '../../../models/recognition.model';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { platformSelector } from '../../../selectors/app.selector';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { selectRenderHistoryLength, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { InterfaceLanguage, RecognitionDialect } from '../../settings/models/settings.model';

// TODO: Fix missing definitions once https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1560 is resolved
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

@Injectable({
  providedIn: 'root'
})
export class WebRecognitionService {
	private recog: SpeechRecognition;
	private recognizedText: WritableSignal<string[]> = signal([]);
	private liveOutput: WritableSignal<string> = signal('');
	private platform: Signal<AppPlatform | undefined>;
  private DEBOUNCE_TIME_MS = 250;
  private SEGMENTATION_DEBOUNCE_MS = 1500;
  private NETWORK_ERROR_DEBOUNCE_MS = 1500;
  private readonly MAX_RECOGNITION_LENGTH = 15;
  private obsConnected: Signal<boolean | undefined>;
  private resultCount: Signal<number | undefined>;
  private transcriptionEnabled: Signal<boolean | undefined>;

	private isStreaming = false;

  constructor(private store: Store<AppState>) {

    this.platform = toSignal(this.store.select(platformSelector));
    this.obsConnected = toSignal(this.store.pipe(select(selectObsConnected), map((status) => status === ObsConnectionState.connected)));
    this.resultCount = toSignal(this.store.select(selectRenderHistoryLength));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled))

		this.recog = new webkitSpeechRecognition();
		this.recog.interimResults = true;
		this.recog.continuous = true;
		this._addEventListeners();
  }

	public setLanguage(language: InterfaceLanguage | RecognitionDialect): void {
		this.recog.lang = language;
	}

	public connectToStream(): void {
		if (this.platform() === AppPlatform.mobile) {
      this.DEBOUNCE_TIME_MS = 2500;
      this.SEGMENTATION_DEBOUNCE_MS = 10000;
    } else if (this.resultCount() === 0) {
      this.DEBOUNCE_TIME_MS = 1000;
      this.SEGMENTATION_DEBOUNCE_MS = 1000;
    }

		this.recog.start();
		this.isStreaming = true;
	}

	public disconnectFromStream(): void {
		this.isStreaming = false;
		this.recog.stop();

	}

	public pauseRecognition(): void {
		this.recog.stop();
	}

	public resumeRecognition(): void {
		this.recog.start();
	}

	public getLiveOutput(): Signal<string> {
		return this.liveOutput;
	}

	public getRecognizedText(): Signal<string[]> {
		return this.recognizedText;
	}

	private _addEventListeners(): void {
		const platform: AppPlatform | undefined = this.platform();
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
					auditTime(this.DEBOUNCE_TIME_MS),
					debounceTime(this.DEBOUNCE_TIME_MS),
					throttleTime(this.DEBOUNCE_TIME_MS, undefined, { leading: false, trailing: true }),
				).subscribe(() => {
					// console.log('debounce ended', Date.now());
					if (mostRecentResults) {
						const partialTranscript: string = mostRecentResults
						.filter((result) => {
							if (result.isFinal && result[0].transcript !== '' && !transcriptSegments.has(result)) {
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
							this.recognizedText.update((current: string[]) => {
								current.push(partialTranscript);
								if (this.transcriptionEnabled()) {
									// console.log('segmentStart', segmentStart)
									this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: partialTranscript, start: segmentStart }))
									segmentStart = undefined;
								}
								return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
							});
							transcript = '';
							this.liveOutput.set('');
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
					if (this.liveOutput() == '') {
						console.log('live output blank')
						if (this.platform() === AppPlatform.desktop) {
							console.log('restarting recognition');
							this.recog.stop();
						}
					} else if (!this.isStreaming) {
						// console.log('recognition stream inactive - stopping')
						this.recog.stop();
					}
				});

				this.recog.addEventListener('result', (e: any) => {
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
					this.liveOutput.set(transcript);
					if (this.obsConnected()) {
						this.store.dispatch(ObsActions.sendCaption({text: transcript}));
					}
				});

				this.recog.addEventListener('end', (e) => {
					// console.log('end', Date.now())
					mostRecentResults = undefined;
					const mostRecentOutput = this.liveOutput();
					transcriptSegments.clear();
					if (mostRecentOutput !== '') {
						this.recognizedText.update((current: string[]) => {
							current.push(mostRecentOutput);
							// this.historyWorker.postMessage({id: streamId, type: 'put', message: mostRecentOutput})
							return current.slice(this.MAX_RECOGNITION_LENGTH * -1);
						});
						if (this.transcriptionEnabled()) {
							this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: mostRecentOutput, start: segmentStart }))
							segmentStart = undefined;
						}
						// console.log('clearing live output');
						this.liveOutput.set('');
						transcript = '';
					}
					if (this.isStreaming) {
						// console.log('recognition still active, restarting')
						this.recog.start();
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
						this.recog.stop();
						this._handleRecognitionError({ error: "network"}, true);
					}
				})

				this.recog.addEventListener('error', (err: any) => {
					console.log('recognition error', err)
					if (err.error === 'network') {
						// Use backoff to retry recognition
						networkError$.next(Date.now());
						return;
					} else if (networkError$.value) {
						networkError$.next(0);
					}
					if (err.error === 'no-speech') {
						if (this.liveOutput() !== '') {
							this.liveOutput.set('');
						}
						return;
					}
					this._handleRecognitionError(err);
					this.recog.stop();
				});
	}

	private _handleRecognitionError(err: any, fatal = false) {
    console.warn('recognition error', err);
    this.store.dispatch(RecognitionActions.error({ error: err.error }))
    if (fatal) {
      this.isStreaming = false;
      this.store.dispatch(RecognitionActions.disconnect({id: ''})) // TODO: Remove dependency on stream ID
      this.store.dispatch(AudioStreamActions.audioStreamError({ error: err.error }))
      if (this.transcriptionEnabled()) {
        this.store.dispatch(RecognitionActions.finalizeTranscript())
      }
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
