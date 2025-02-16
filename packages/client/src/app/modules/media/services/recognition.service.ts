import { Injectable, Signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { RecognitionActions } from '../../../actions/recogntion.actions';
import { AppState } from '../../../models/app.model';
import { ObsConnectionState } from '../../../reducers/obs.reducer';
import { selectObsConnected } from '../../../selectors/obs.selectors';
import { dialectSelector, languageSelector, selectTranscriptionEnabled } from '../../../selectors/settings.selector';
import { DefaultDialects, InterfaceLanguage, RecognitionDialect } from '../../settings/models/settings.model';
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


	private activeLanguage: Signal<InterfaceLanguage | RecognitionDialect>;
	private activeDialect: Signal<RecognitionDialect>;
	private transcriptionEnabled: Signal<boolean | undefined>;

	private provider: Signal<RecognitionEngineState['provider']>;
  constructor(private store: Store<AppState>,
		private webRecognition: WebRecognitionService,
		private azureRecognition: AzureRecognitionService,
	) {
		const language = toSignal(this.store.select(languageSelector)) as Signal<InterfaceLanguage>;
		const dialect = toSignal(this.store.select(dialectSelector));

		this.activeLanguage = computed(() => {
			const l = language();
			const d = dialect();
			if (d && d !== 'unspecified') return d;
			return l;
		});

		this.activeDialect = computed(() => {
			const l = language();
			const d = dialect();
			if (d && d !== 'unspecified') return d;
			const fallback = DefaultDialects[l];
			return fallback || 'en-US';
		})

		this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
		const engine = toSignal(this.store.select(selectRecognitionEngine));
		this.provider = computed(() => {
			return engine()?.provider || 'web'
		})
		effect(() => {
			const al = this.activeLanguage();
			if (this.provider() === 'web') {
				this.webRecognition.setLanguage(al);
			}
		})
		effect(() => {
			const d = this.activeDialect();
			if (this.provider() === 'azure' && d) {
				this.azureRecognition.setLanguage(d);
			}
		})
	}

  public connectToStream(): void {
    console.log('connect to stream', this.activeLanguage()) // TODO: Remove after confirmming italian bug on mobile is no longer an issue
		if (this.provider() === 'web') {
			this.webRecognition.connectToStream();
		} else {
			this.azureRecognition.connectToStream(this.activeDialect());
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

  public getLiveOutput(): Signal<string> {
		if (this.provider() === 'web') {
			return this.webRecognition.getLiveOutput();
		} else {
			return this.azureRecognition.getLiveOutput();
		}
  }

  getRecognizedText(): Signal<string[]> {
		if (this.provider() === 'web') {
			return this.webRecognition.getRecognizedText();
		} else {
			return this.azureRecognition.getRecognizedText();
		}
  }
}
