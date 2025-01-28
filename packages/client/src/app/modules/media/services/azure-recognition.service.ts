import { HttpClient } from "@angular/common/http";
import { Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { map, Observable, take } from "rxjs";
import { RecognitionActions } from "../../../actions/recognition.actions";
import { AppState } from "../../../models/app.model";
import { selectTranscriptionEnabled } from "../../../selectors/settings.selector";
import { InterfaceLanguage, RecognitionDialect } from "../../settings/models/settings.model";

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

	constructor(private store: Store<AppState>,
							private http: HttpClient
	) {
		const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
		this.azureSttEndpoint = `${baseUrl}/${apiVersion}/azure-stt`;
		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled))
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
				this.initialize(language).pipe(take(1)).subscribe((result) => {
					this.store.dispatch(RecognitionActions.setToken(result))
				})
			}
		}
	}

	public connectToStream(): void {
		if (!this.recognizer) {
			throw new Error('Azure Recognition Engine not initialized!')
		}
		this.recognizer.startContinuousRecognitionAsync(
			() => {
				console.log('recognizer started continuous async')
				this.isStreaming = true;
			},
			(err) => {
				this.isStreaming = false;
				this.store.dispatch(RecognitionActions.error({error: err}))
			}
		)
	}

	public disconnectFromStream(): void {
		this.isStreaming = false;
		this.recognizer?.stopContinuousRecognitionAsync(
			() => {
				console.log('recognizer stopped continuous async')
			},
			(err) => {
				this.store.dispatch(RecognitionActions.error({error: err}))
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
			this.recognizer.recognizing = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				console.log('recognizing', event, sender);
				this.liveOutput.set(event.result.text);
				if (!segmentStart) {
					segmentStart = new Date()
				}
			}
			this.recognizer.recognized = (sender: sdk.Recognizer, event: sdk.SpeechRecognitionEventArgs) => {
				console.log('recognized', event, sender);
				this.recognizedText.update((current: string[]) => {
					current.push(event.result.text);
					return current;
				});
				this.liveOutput.set('');
				if (this.transcriptionEnabled()) {
					this.store.dispatch(RecognitionActions.addTranscriptSegment({ text: event.result.text, start: segmentStart }))
					segmentStart = undefined;
				}
			}
		}
	}

	private _getToken(): Observable<{token: string; region: string}> {
		return this.http.get<{token: string; region: string}>(`${this.azureSttEndpoint}/get-token`);
	}



}