import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectTranscriptionEnabled, selectTranscriptTitlePattern } from '../../../../selectors/settings.selector';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';

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
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.transcriptionEnabled = toSignal(this.store.select(selectTranscriptionEnabled));
    this.titlePattern = toSignal(this.store.select(selectTranscriptTitlePattern));

    this.formGroup = this.fb.group({
      enabled: this.fb.control(this.transcriptionEnabled()),
      titlePattern: this.fb.control(this.titlePattern())
    })
  }
}
