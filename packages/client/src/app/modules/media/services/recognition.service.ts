import { Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Subject, auditTime, debounceTime, delay, filter, map, takeUntil, throttleTime, withLatestFrom } from 'rxjs';
import { ObsActions } from '../../../actions/obs.actions';
import { AppPlatform, AppState, BrowserPlatform } from '../../../models/app.model';
import { AudioStreamActions } from '../../../models/audio-stream.model';
import { SpeechRecognition } from '../../../models/recognition.model';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { browserSelector, platformSelector } from '../../../selectors/app.selector';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { dialectSelector, languageSelector, selectRenderHistoryLength, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { InterfaceLanguage, RecognitionDialect } from '../../settings/models/settings.model';
import { WebRecognitionService } from './web-recognition.service';
// TODO: Fix missing definitions once https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1560 is resolved
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

	private language: Signal<InterfaceLanguage>;
	private obsConnected: Signal<boolean | undefined>;
	private transcriptionEnabled: Signal<boolean | undefined>;
	private dialect: Signal<RecognitionDialect | undefined>;
  constructor(private store: Store<AppState>,
		private webRecognition: WebRecognitionService
	) {
		this.language = toSignal(this.store.select(languageSelector)) as Signal<InterfaceLanguage>;
		this.obsConnected = toSignal(this.store.pipe(select(selectObsConnected), map((status) => status === ObsConnectionState.connected)));
		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
		this.dialect = toSignal(this.store.select(dialectSelector));
		effect(() => {
			const l = this.language();
			const d = this.dialect();
			this.webRecognition.setLanguage(d && d !== 'unspecified' ? d : l)
		})
	}

  public connectToStream(streamId: string): void {
    this.webRecognition.connectToStream();
  }

  public disconnectFromStream(streamId: string): void {
    this.webRecognition.disconnectFromStream();
  }

  public pauseRecognition(): void {
		this.webRecognition.pauseRecognition();
  }

  public resumeRecognition(): void {
		this.webRecognition.resumeRecognition();
  }

  public getLiveOutput(streamId: string): Signal<string> {
		// TODO: Refactor streamId to recognition engine selector
		return this.webRecognition.getLiveOutput();
  }

  getRecognizedText(streamId: string): Signal<string[]> {
		// TODO: Refactor streamId to recognition engine selector
		return this.webRecognition.getRecognizedText();
  }
}
