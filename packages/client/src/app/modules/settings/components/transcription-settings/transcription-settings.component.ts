import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { recognitionActiveSelector, selectProfanityFilterEnabled, selectRecognitionEngineProvider } from '../../../../selectors/recognition.selector';
import { selectTranscriptionEnabled, selectTranscriptSettingsLoading, selectTranscriptTitlePattern } from '../../../../selectors/settings.selector';
import { SettingsActions, TranscriptionSettings } from '../../models/settings.model';

@Component({
  selector: 'app-transcription-settings',
  templateUrl: './transcription-settings.component.html',
  styleUrls: ['./transcription-settings.component.scss'],
})
export class TranscriptionSettingsComponent {
  public formGroup: FormGroup<{
    enabled: FormControl<boolean | undefined | null>;
    titlePattern: FormControl<string | undefined | null>;
  }>;
  public isLoggedIn: Signal<boolean | undefined>;
  public transcriptionEnabled: Signal<boolean | undefined>;
  public titlePattern: Signal<string | undefined>;
  public loading: Signal<boolean | undefined>;
  public profanityFilterEnabled = this.store.selectSignal(selectProfanityFilterEnabled);
  public engineProvider = this.store.selectSignal(selectRecognitionEngineProvider);
  public isRecognitionActive = this.store.selectSignal(recognitionActiveSelector);

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
    this.titlePattern = toSignal(this.store.select(selectTranscriptTitlePattern));
    this.loading = toSignal(this.store.select(selectTranscriptSettingsLoading));

    this.formGroup = this.fb.group({
      enabled: this.fb.control(this.transcriptionEnabled()),
      titlePattern: this.fb.control(this.titlePattern())
    });

  }

  public toggleProfanityFilter(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.store.dispatch(RecognitionActions.setProfanityFilter({ enabled: isChecked }));
  }

  public saveSettings(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const settings: Partial<TranscriptionSettings> = {
        enabled: !!this.formGroup.value.enabled
      }
      if (this.formGroup.value.titlePattern) {
        settings.titlePattern = this.formGroup.value.titlePattern
      }
      this.store.dispatch(SettingsActions.saveTranscriptionSettings({ transcription: settings }))
      this.formGroup.markAsPristine();
    } else {
      console.log('form group not valid', this.formGroup)
    }
  }
}
