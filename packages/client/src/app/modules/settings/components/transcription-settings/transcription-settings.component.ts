import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectTranscriptionEnabled, selectTranscriptRecordAudio, selectTranscriptSettingsLoading, selectTranscriptTitlePattern } from '../../../../selectors/settings.selector';
import { SettingsActions, TranscriptionSettings } from '../../models/settings.model';

@Component({
  selector: 'app-transcription-settings',
  templateUrl: './transcription-settings.component.html',
  styleUrls: ['./transcription-settings.component.scss'],
})
export class TranscriptionSettingsComponent {
  public formGroup: FormGroup<{
    enabled: FormControl<boolean | undefined | null>;
    recordAudio: FormControl<boolean | undefined | null>;
    titlePattern: FormControl<string | undefined | null>;
  }>;
  public isLoggedIn: Signal<boolean | undefined>;
  public transcriptionEnabled: Signal<boolean | undefined>;
  public titlePattern: Signal<string | undefined>;
  public loading: Signal<boolean | undefined>;
  public recordTranscriptionAudio: Signal<boolean | undefined>;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
    this.recordTranscriptionAudio = toSignal(this.store.select(selectTranscriptRecordAudio))
    this.titlePattern = toSignal(this.store.select(selectTranscriptTitlePattern));
    this.loading = toSignal(this.store.select(selectTranscriptSettingsLoading));

    this.formGroup = this.fb.group({
      enabled: this.fb.control(this.transcriptionEnabled()),
      recordAudio: this.fb.control(this.recordTranscriptionAudio()),
      titlePattern: this.fb.control(this.titlePattern())
    });

  }

  public saveSettings(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const settings: Partial<TranscriptionSettings> = {
        enabled: !!this.formGroup.value.enabled
      }
      if (this.formGroup.controls['titlePattern'].dirty) {
        settings.titlePattern = this.formGroup.value.titlePattern || undefined
      }
      if (this.formGroup.controls['recordAudio'].dirty) {
        settings.recordAudio = this.formGroup.value.recordAudio || undefined
      }

      this.store.dispatch(SettingsActions.saveTranscriptionSettings({ transcription: settings }))
      this.formGroup.markAsPristine();
    } else {
      console.log('form group not valid', this.formGroup)
    }
  }
}
