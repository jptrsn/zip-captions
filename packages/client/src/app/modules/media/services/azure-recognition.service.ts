import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { map, Observable, take } from "rxjs";
import { RecognitionActions } from "../../../actions/recogntion.actions";
import { AppState } from "../../../models/app.model";
import { selectTranscriptionEnabled } from "../../../selectors/settings.selector";
import { InterfaceLanguage, RecognitionDialect } from "../../settings/models/settings.model";
import { UserActions } from "../../../actions/user.actions";

@Injectable({
	providedIn: 'root'
})
export class AzureRecognitionService {
	private recognizedText: WritableSignal<string[]> = signal([]);
	private liveOutput: WritableSignal<string> = signal('');
	private isStreaming = false;
	private recognizer?: sdk.SpeechRecognizer;
	private azureSttEndpoint: string;
	private readonly MAX_RECOGNITION_LENGTH = 15;
	private transcriptionEnabled: Signal<boolean | undefined>;
	private readonly STT_CREDITS_PER_MINUTE = 60;

	constructor(private store: Store<AppState>,
							private http: HttpClient
	) {
		const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
		this.azureSttEndpoint = `${baseUrl}/${apiVersion}/azure-stt`;
		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled))
		sdk.Diagnostics.SetLoggingLevel(sdk.LogLevel.Debug);
	}

	public initialize(language: InterfaceLanguage | RecognitionDialect): Observable<{token: string; region: string}> {
		return this._getToken().pipe(map((auth) => {
			if (!auth) throw new Error('Azure Recognition Service missing token');
			const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(auth.token, auth.region);
			speechConfig.speechRecognitionLanguage = language;

			const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
			this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
			this._addEventListeners();
			return auth;
		}))
	}

	public setLanguage(language: InterfaceLanguage | RecognitionDialect): void {
		if (this.recognizer) {
			if (this.recognizer.speechRecognitionLanguage !== language) {
				this.recognizer.close();
				this.initialize(language).pipe(take(1)).subscribe()
			}
		}
	}

	public connectToStream(language: InterfaceLanguage | RecognitionDialect): void {
		this.initialize(language).pipe(take(1)).subscribe({
			next: (result) => {
				this.isStreaming = true;
				this.recognizer?.startContinuousRecognitionAsync(
					() => {
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
				// console.log('recognizer stopped continuous async')
			},
			(err: any) => {
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

	public getRecognizedText(): Signal<string[]> {
		return this.recognizedText;
	}

	private _addEventListeners(): void {
		if (this.recognizer) {
			let segmentStart: Date | undefined;
			this.recognizer.sessionStarted = (sender: sdk.Recognizer, event: sdk.SessionEventArgs) => {
				console.log('session started', event.sessionId, this.isStreaming);
				this._startSession(event.sessionId, Date.now());
			}
			this.recognizer.sessionStopped = (sender: sdk.Recognizer, event: sdk.SessionEventArgs) => {
				console.log('session stopped', event.sessionId);
				this._endSession(event.sessionId, Date.now());
			}
			this.recognizer.recognizing = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				this.liveOutput.set(event.result.text);
				if (!segmentStart) {
					segmentStart = new Date()
				}
			}
			this.recognizer.recognized = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				console.log('recognized', event.result.text);
				this._updateSession(event.sessionId, Date.now());
				this.recognizedText.update((current: string[]) => {
					current.push(event.result.text);
					return current;
				});
				this.liveOutput.set('');
				if (this.transcriptionEnabled()) {
					this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: event.result.text, start: segmentStart }))
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
		this.http.post<void>(`${this.azureSttEndpoint}/track`, { sessionId, timestamp }).pipe(take(1)).subscribe({
			error: (err: any) => {
				this.recognizer?.stopContinuousRecognitionAsync();
				this.store.dispatch(RecognitionActions.disconnectFailure({ error: err.message }))
			}
		});
	}

	private _endSession(sessionId: string, timestamp?: number) {
		console.log('end session')
		return this.http.post<{creditBalance: number}>(`${this.azureSttEndpoint}/end`, { sessionId, timestamp }).pipe(take(1)).subscribe({
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