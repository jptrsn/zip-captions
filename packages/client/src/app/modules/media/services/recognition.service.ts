import { Injectable, Signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { RecognitionActions } from '../../../actions/recognition.actions';
import { AppState } from '../../../models/app.model';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { dialectSelector, languageSelector, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { InterfaceLanguage, RecognitionDialect } from '../../settings/models/settings.model';
import { WebRecognitionService } from './web-recognition.service';
import { RecognitionEngineState } from '../../../models/recognition.model';
import { selectRecognitionEngine } from '../../../selectors/recognition.selector';
import { AzureRecognitionService } from './azure-recognition.service';
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
	private provider: Signal<RecognitionEngineState['provider']>;
  constructor(private store: Store<AppState>,
		private webRecognition: WebRecognitionService,
		private azureRecognition: AzureRecognitionService,
	) {
		this.language = toSignal(this.store.select(languageSelector)) as Signal<InterfaceLanguage>;
		this.obsConnected = toSignal(this.store.pipe(select(selectObsConnected), map((status) => status === ObsConnectionState.connected)));
		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
		this.dialect = toSignal(this.store.select(dialectSelector));
		const engine = toSignal(this.store.select(selectRecognitionEngine));
		this.provider = computed(() => {
			return engine()?.provider || 'web'
		})
		effect(() => {
			const l = this.language();
			const d = this.dialect();
			if (this.provider() === 'web') {
				this.webRecognition.setLanguage(d && d !== 'unspecified' ? d : l)
			} else {
				this.azureRecognition.setLanguage(d && d !== 'unspecified' ? d : l)
			}
		})
	}

  public connectToStream(): void {
		if (this.provider() === 'web') {
			this.webRecognition.connectToStream();
		} else {
			this.azureRecognition.connectToStream();
		}
  }

  public disconnectFromStream(): void {
		if (this.provider() === 'web') {
			this.webRecognition.disconnectFromStream();
		} else {
			this.azureRecognition.disconnectFromStream();
		}
		if (this.transcriptionEnabled()) {
      this.store.dispatch(RecognitionActions.finalizeTranscript());
    }
  }

  public pauseRecognition(): void {
		if (this.provider() === 'web') {
			this.webRecognition.pauseRecognition();
		} else {
			this.azureRecognition.pauseRecognition();
		}
  }

  public resumeRecognition(): void {
		if (this.provider() === 'web') {
			this.webRecognition.resumeRecognition();
		} else {
			this.azureRecognition.resumeRecognition();
		}
  }

  public getLiveOutput(streamId: string): Signal<string> {
		if (this.provider() === 'web') {
			return this.webRecognition.getLiveOutput();
		} else {
			return this.azureRecognition.getLiveOutput();
		}
  }

  getRecognizedText(streamId: string): Signal<string[]> {
		if (this.provider() === 'web') {
			return this.webRecognition.getRecognizedText();
		} else {
			return this.azureRecognition.getRecognizedText();
		}
  }
}
