import { HttpClient } from "@angular/common/http";
import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { map, Observable, take } from "rxjs";
import { RecognitionActions } from "../../../actions/recogntion.actions";
import { AppState } from "../../../models/app.model";
import { CaptionSegment, CaptionSegmentHistory } from "../../../models/caption-segment.model";
import { selectProfanityFilterEnabled } from "../../../selectors/recognition.selector";
import { selectTranscriptionEnabled, selectTranslationSettings } from "../../../selectors/settings.selector";
import { SegmentLanguageService } from "../../../services/translator/segment-language.service";
import { BilingualDialects, InterfaceLanguage, RecognitionDialect } from "../../settings/models/settings.model";
import { UserActions } from "../../../actions/user.actions";

@Injectable({
	providedIn: 'root'
})
export class AzureRecognitionService {
	private recognizedSegments: WritableSignal<CaptionSegment[]> = signal([]);
	private recognizedText: Signal<string[]> = computed(() => this.recognizedSegments().map((segment) => segment.text));
	private liveOutput: WritableSignal<string> = signal('');
	private isStreaming = false;
	private recognizer?: sdk.SpeechRecognizer;
	private azureSttEndpoint: string;
	private readonly MAX_RECOGNITION_LENGTH = 15;
	private segmentHistory: CaptionSegmentHistory;
	private recognitionLang = '';
	private transcriptionEnabled: Signal<boolean | undefined>;
	private profanityFilterEnabled: Signal<boolean | undefined>;
	private readonly STT_CREDITS_PER_MINUTE = 60;
  private tokenRefreshTimerId?: number;

	// Final segments of a bilingual model are tagged by detection one at a time, in order
	private appendQueue: Promise<void> = Promise.resolve();
	private pendingAppends = 0;
	private lastSegmentLang?: string;
	private translationOn: Signal<boolean>;

	constructor(private store: Store<AppState>,
							private http: HttpClient,
							private segmentLanguage: SegmentLanguageService
	) {
		this.translationOn = toSignal(this.store.select(selectTranslationSettings).pipe(map((t) => (t?.mode ?? 'off') !== 'off')), { initialValue: false });
		const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
		this.azureSttEndpoint = `${baseUrl}/${apiVersion}/azure-stt`;
		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
		this.profanityFilterEnabled = toSignal(this.store.select(selectProfanityFilterEnabled));
		this.segmentHistory = new CaptionSegmentHistory('a', this.MAX_RECOGNITION_LENGTH);
	}

	public initialize(language: InterfaceLanguage | RecognitionDialect): Observable<{token: string; region: string}> {
		return this._getToken().pipe(map((auth) => {
			if (!auth) throw new Error('Azure Recognition Service missing token');
			const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(auth.token, auth.region);
			speechConfig.speechRecognitionLanguage = language;
			this.recognitionLang = language;
			this.lastSegmentLang = undefined;

			if (this.profanityFilterEnabled() === false) {
				speechConfig.setProfanity(sdk.ProfanityOption.Raw);
			} else {
				speechConfig.setProfanity(sdk.ProfanityOption.Masked);
			}

			const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
			this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
			this._addEventListeners();
			return auth;
		}));
	}

	public setLanguage(language: InterfaceLanguage | RecognitionDialect): void {
		if (this.recognizer) {
			if (this.recognizer.speechRecognitionLanguage !== language) {
				const previous = this.recognizer;
				const wasStreaming = this.isStreaming;
				if (wasStreaming) {
					previous.stopContinuousRecognitionAsync();
				}
				previous.close();
				// Same configuration as a fresh connection; only the locale differs
				if (wasStreaming) {
					this.connectToStream(language);
				} else {
					this.initialize(language).pipe(take(1)).subscribe();
				}
			}
		}
	}

	public connectToStream(language: InterfaceLanguage | RecognitionDialect): void {
		// Starting follows the user's click, which is when the detector's model may be downloaded
		const pair = this._bilingualPair(language);
		if (pair) void this.segmentLanguage.prepare(pair);
		this.initialize(language).pipe(take(1)).subscribe({
			next: (result) => {
				this.isStreaming = true;
				this.recognizer?.startContinuousRecognitionAsync(
					() => {
            window.clearInterval(this.tokenRefreshTimerId);
            this.tokenRefreshTimerId = window.setInterval(() => {
              this._refreshToken()
            }, (8 * 60 * 1000));
						console.log('recognizer started continuous async', this.isStreaming)
					},
					(err: any) => {
						console.warn('start continuous error!', err)
						this.isStreaming = false;
						this.store.dispatch(RecognitionActions.disconnectFailure({error: err.message }))
					}
				)
			},
			error: (err: any) => {
				console.warn('start continuous error!', err)
				this.isStreaming = false;
				this.store.dispatch(RecognitionActions.disconnectFailure({error: err.message }))
			}
		})
	}

	public disconnectFromStream(): void {
		this.isStreaming = false;
		this.recognizer?.stopContinuousRecognitionAsync(
			() => {
				console.log('recognizer stopped continuous async')
        window.clearInterval(this.tokenRefreshTimerId);
			},
			(err: any) => {
        console.warn('azure stt disconnect error', err);
				this.store.dispatch(RecognitionActions.disconnectFailure({error: err.message }))
			}
		)
		this.recognizer?.close(() => {
			this.recognizer = undefined;
			},
			(err) => {
				this.store.dispatch(RecognitionActions.disconnectFailure({error: err}))
			}
		)
	}

	public pauseRecognition(): void {
		this.recognizer?.stopContinuousRecognitionAsync();
	}

	public resumeRecognition(): void {
		this.recognizer?.startContinuousRecognitionAsync();
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

  private _refreshToken(): void {
      this._getToken().pipe(take(1)).subscribe((auth) => {
        if (this.recognizer !== undefined) {
          this.recognizer.authorizationToken = auth.token;
          console.log('token refreshed');
        }
      })
  }

	/** The two languages of the locale when it is a bilingual model and translation is on; otherwise nothing is detected */
	private _bilingualPair(locale: string): readonly string[] | undefined {
		if (!this.translationOn()) return undefined;
		const pair = BilingualDialects[locale as RecognitionDialect];
		return pair && pair.length > 1 ? pair : undefined;
	}

	private async _appendDetected(text: string, pair: readonly string[] | undefined, start: Date | undefined): Promise<void> {
		const configured = this.recognitionLang;
		let lang = configured;
		if (pair) {
			const configuredBase = configured.split('-')[0].toLowerCase();
			void this.segmentLanguage.prepare(pair);
			const base = await this.segmentLanguage.detect(text, pair, this.lastSegmentLang, configuredBase);
			this.lastSegmentLang = base;
			// The configured locale keeps its region (fr-CA); the other language is tagged by its base code
			lang = base === configuredBase ? configured : base;
		}
		this.recognizedSegments.update((current: CaptionSegment[]) => this.segmentHistory.append(current, text, lang, start));
	}

	private _addEventListeners(): void {
		if (this.recognizer) {
			let segmentStart: Date | undefined;
			this.recognizer.sessionStarted = (sender: sdk.Recognizer, event: sdk.SessionEventArgs) => {
				this._startSession(event.sessionId, Date.now());
			}
			this.recognizer.sessionStopped = (sender: sdk.Recognizer, event: sdk.SessionEventArgs) => {
				this._endSession(event.sessionId, Date.now());
			}
			this.recognizer.recognizing = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				this.liveOutput.set(event.result.text);
				if (!segmentStart) {
					segmentStart = new Date()
				}
			}
			this.recognizer.recognized = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				this._updateSession(event.sessionId, Date.now());
				// NoMatch results arrive with empty text; they are not captions
				const text = event.result.text;
				const hasSpeech = event.result.reason === sdk.ResultReason.RecognizedSpeech && !!text?.trim();
				if (hasSpeech) {
					// Respect the language Azure reports for the result, when it provides one
					const reported = event.result.language;
					const start = segmentStart;
					const pair = reported ? undefined : this._bilingualPair(this.recognitionLang);
					if (pair || this.pendingAppends > 0) {
						// Azure does not say which of a bilingual model's languages was spoken; this device works it out
						// from the text. Appends stay in order, so a segment never overtakes one still being checked.
						this.pendingAppends++;
						this.appendQueue = this.appendQueue
							.then(() => this._appendDetected(text, pair, start))
							.finally(() => this.pendingAppends--);
					} else {
						const lang = reported || this.recognitionLang;
						this.recognizedSegments.update((current: CaptionSegment[]) => {
							return this.segmentHistory.append(current, text, lang, start);
						});
					}
				}
				this.liveOutput.set('');
				if (hasSpeech && this.transcriptionEnabled()) {
					this.store.dispatch(RecognitionActions.addTranscriptSegment({ text, start: segmentStart }))
				}
				segmentStart = undefined;
			}
			this.recognizer.canceled = (sender: sdk.Recognizer,  event: sdk.SpeechRecognitionCanceledEventArgs) => {
				console.log('cancelled', event);
				this.isStreaming = false;
				this.store.dispatch(RecognitionActions.disconnectFailure({ error: event.errorDetails }));
			}
		}
	}

	private _getToken(): Observable<{token: string; region: string}> {
		return this.http.get<{token: string; region: string}>(`${this.azureSttEndpoint}/get-token`);
	}

	private _startSession(sessionId: string, timestamp?: number): void {
		this.http.post<{id: string}>(`${this.azureSttEndpoint}/start`, { sessionId, timestamp }).pipe(take(1)).subscribe({
			error: (err: any) => {
				this.recognizer?.stopContinuousRecognitionAsync();
				this.store.dispatch(RecognitionActions.disconnectFailure({ error: err.message }))
			}
		});
	}

	private _updateSession(sessionId: string, timestamp?: number): void {
		this.http.post<boolean>(`${this.azureSttEndpoint}/track`, { sessionId, timestamp }).pipe(take(1)).subscribe({
      next: (success: boolean) => {
        console.log('track response', success);
        if (!success) {
          this.store.dispatch(RecognitionActions.fallbackEngine());
        }
      },
			error: (err: any) => {
				this.recognizer?.stopContinuousRecognitionAsync();
				this.store.dispatch(RecognitionActions.disconnectFailure({ error: err.message }))
			}
		});
	}

	private _endSession(sessionId: string, timestamp?: number): void {
		console.log('end session')
		this.http.post<{creditBalance: number}>(`${this.azureSttEndpoint}/end`, { sessionId, timestamp }).pipe(take(1)).subscribe({
			next: ({ creditBalance }) => {
				this.store.dispatch(UserActions.updateBalance({ creditBalance }));
			},
			error: (err: any) => {
				this.recognizer?.stopContinuousRecognitionAsync();
				this.store.dispatch(RecognitionActions.disconnectFailure({ error: err.message }))
			}
		});
	}

}
