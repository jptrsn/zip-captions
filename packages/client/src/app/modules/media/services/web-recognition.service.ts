import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, auditTime, debounceTime, delay, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { AppPlatform, AppState } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { CaptionSegment, CaptionSegmentHistory } from '../../../models/caption-segment.model';
import { SpeechRecognition } from '../../../models/recognition.model';
import { platformSelector } from '../../../selectors/app.selector';
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
	private recognizedSegments: WritableSignal<CaptionSegment[]> = signal([]);
	private recognizedText: Signal<string[]> = computed(() => this.recognizedSegments().map((segment) => segment.text));
	private liveOutput: WritableSignal<string> = signal('');
	private platform: Signal<AppPlatform | undefined>;
  private DEBOUNCE_TIME_MS = 250;
  private SEGMENTATION_DEBOUNCE_MS = 1500;
  private NETWORK_ERROR_DEBOUNCE_MS = 1500;
  private readonly MAX_RECOGNITION_LENGTH = 15;
  private segmentHistory: CaptionSegmentHistory;
  // recog.lang only applies on the next start(), so segments use the language captured at start
  private sessionLang = '';
  private resultCount: Signal<number | undefined>;
  private transcriptionEnabled: Signal<boolean | undefined>;
  private mostRecentResults: SpeechRecognitionResult[] | undefined;
  private transcriptSegments: Set<SpeechRecognitionResult> = new Set<SpeechRecognitionResult>();
  private clearedResultCount = 0;
  private segmentStart: Date | undefined;
  private transcript = '';

	private isStreaming = false;
	private paused = false;

  constructor(private store: Store<AppState>) {

    this.platform = toSignal(this.store.select(platformSelector));
    this.resultCount = toSignal(this.store.select(selectRenderHistoryLength));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled))
    this.segmentHistory = new CaptionSegmentHistory('w', this.MAX_RECOGNITION_LENGTH);

		// Firefox has no speech recognition. This root service is built by anything that injects RecognitionService,
		// including the screens a viewer sees, so it must not throw; hosting is gated by the browser check instead.
		this.recog = typeof webkitSpeechRecognition === 'undefined'
			? ({ lang: '', start: () => undefined, stop: () => undefined, abort: () => undefined, addEventListener: () => undefined } as unknown as SpeechRecognition)
			: new webkitSpeechRecognition();
		this.recog.interimResults = true;
		this.recog.continuous = true;
		this._addEventListeners();
  }

	public setLanguage(language: InterfaceLanguage | RecognitionDialect): void {
		const changed = this.recog.lang !== language;
		this.recog.lang = language;
		// recog.lang only applies on the next start(); stopping lets the `end` handler restart with it
		if (changed && this.isStreaming) {
			this.recog.stop();
		}
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
		this.paused = false;
		this.recog.stop();

	}

	public pauseRecognition(): void {
		this.paused = true;
		this.recog.stop();
	}

	public resumeRecognition(): void {
		this.paused = false;
		try {
			this.recog.start();
		} catch (err: any) {
			// A quick resume can land while the stop from the pause is still pending, and start() throws then.
			// The `end` handler restarts recognition because it is no longer paused. Any other failure is real.
			if (err?.name !== 'InvalidStateError') {
				this.paused = true;
				throw err;
			}
		}
	}

	public getLiveOutput(): Signal<string> {
		return this.liveOutput;
	}

	public getRecognizedSegments(): Signal<CaptionSegment[]> {
		return this.recognizedSegments;
	}

	public getRecognizedText(): Signal<string[]> {
		return this.recognizedText;
	}

	public clear(): void {
		if (this.transcriptionEnabled()) {
			const partialTranscript: string = this._getPendingFinalTranscript();
			const textToFlush = partialTranscript !== '' ? partialTranscript : this.transcript.trim();
			if (textToFlush !== '') {
				if (!this.segmentStart) {
					this.segmentStart = new Date();
				}
				this.store.dispatch(RecognitionActions.addTranscriptSegment({
					text: textToFlush,
					start: this.segmentStart
				}));
				this.segmentStart = undefined;
			}
		}
		if (this.mostRecentResults) {
			if (this.platform() === AppPlatform.desktop) {
				this.clearedResultCount = this.mostRecentResults.length;
			}
			for (const result of this.mostRecentResults) {
				this.transcriptSegments.add(result);
			}
			this.mostRecentResults = undefined;
		}
		this.segmentStart = undefined;
		this.transcript = '';
		this.recognizedSegments.set([]);
		this.liveOutput.set('');
	}

	private _getPendingFinalTranscript(): string {
		if (!this.mostRecentResults) {
			return '';
		}
		const platform: AppPlatform | undefined = this.platform();
		const results = platform === AppPlatform.desktop
			? this.mostRecentResults.slice(this.clearedResultCount)
			: this.mostRecentResults;
		return results
			.filter((result) => {
				if (result.isFinal && result[0].transcript !== '' && !this.transcriptSegments.has(result)) {
					this.transcriptSegments.add(result);
					return true;
				}
				return false;
			})
			.map((result: SpeechRecognitionResult) => result[0])
			.reduce((acc, alternative: SpeechRecognitionAlternative) => {
				if (platform === AppPlatform.mobile) {
					acc.push(alternative);
				} else if (alternative.confidence > 0) {
					acc.push(alternative);
				}
				return acc;
			}, [] as SpeechRecognitionAlternative[])
			.map((alternative) => alternative.transcript)
			.join('')
			.trim();
	}

	private _segmentLang(): string {
		return this.sessionLang || this.recog.lang;
	}

	private _addEventListeners(): void {
		const platform: AppPlatform | undefined = this.platform();

		// Debounce is to provide a timeout after the last-recognized full text,
				// in order to better handle chunking in related tasks for the media stream
				// TODO: Allow adjustment of debounce
				const debounce$: Subject<number> = new Subject<number>()
				const disconnect$: Subject<void> = new Subject<void>();

				// Network error observable is used to debounce intermittent network issues that interrupt connection to the recognition server without going offline fully
				const networkError$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

				// Live results logic
				debounce$.pipe(
					takeUntil(disconnect$),
					auditTime(this.DEBOUNCE_TIME_MS),
					debounceTime(this.DEBOUNCE_TIME_MS),
					throttleTime(this.DEBOUNCE_TIME_MS, undefined, { leading: false, trailing: true }),
				).subscribe(() => {
					// console.log('debounce ended', Date.now());
					if (this.mostRecentResults) {
						const partialTranscript: string = this._getPendingFinalTranscript();
						if (partialTranscript !== '') {
							if (!this.segmentStart) {
								this.segmentStart = new Date();
							}
							const start = this.segmentStart;
							this.recognizedSegments.update((current: CaptionSegment[]) => {
								if (this.transcriptionEnabled()) {
									// console.log('segmentStart', this.segmentStart)
									this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: partialTranscript, start: this.segmentStart }))
									this.segmentStart = undefined;
								}
								return this.segmentHistory.append(current, partialTranscript, this._segmentLang(), start);
							});
							this.transcript = '';
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

				this.recog.addEventListener('start', () => {
					this.sessionLang = this.recog.lang;
				});

				this.recog.addEventListener('result', (e: any) => {
					// console.log('result', e.results[0][0])
					debounce$.next(Date.now());
					if (this.platform() === AppPlatform.desktop) {
						this.mostRecentResults = Array.from(e.results);
						this.transcript = this.mostRecentResults
						.slice(this.clearedResultCount)
						.filter((result: SpeechRecognitionResult) => !this.transcriptSegments.has(result))
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
						this.mostRecentResults = [lastResult];
						if (lastResult[0].transcript.length) {
							this.transcript = lastResult[0].transcript
						}
					}
					if (this.transcript.length && !this.segmentStart) {
						this.segmentStart = new Date();
					}
					this.liveOutput.set(this.transcript);
				});

				this.recog.addEventListener('end', (e) => {
					// console.log('end', Date.now())
					this.mostRecentResults = undefined;
					this.clearedResultCount = 0;
					const mostRecentOutput = this.liveOutput();
					this.transcriptSegments.clear();
					if (mostRecentOutput !== '') {
						const start = this.segmentStart;
						this.recognizedSegments.update((current: CaptionSegment[]) => {
							return this.segmentHistory.append(current, mostRecentOutput, this._segmentLang(), start);
						});
						if (this.transcriptionEnabled()) {
							this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: mostRecentOutput, start: this.segmentStart }))
						}
						this.segmentStart = undefined;
						// console.log('clearing live output');
						this.liveOutput.set('');
						this.transcript = '';
					}
					if (this.isStreaming) {
						// restart unless paused; resumeRecognition() starts it again
						if (!this.paused) this.recog.start();
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
