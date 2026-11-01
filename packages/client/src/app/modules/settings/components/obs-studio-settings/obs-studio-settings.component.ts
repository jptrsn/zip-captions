import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ObsActions } from '../../../../actions/obs.actions';
import { AppState } from '../../../../models/app.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected, selectObsError, selectObsStreamActive } from '../../../../selectors/obs.selectors';
import { selectObsFeed } from '../../../../selectors/settings.selector';
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { obsCannotShowLanguage, obsEffectiveLanguage } from '../../../../services/obs-connection/obs-caption';
import { obsConnectionStateKey } from '../../../../services/obs-connection/obs-connection-state';
import { ObsFeed, SettingsActions } from '../../models/settings.model';

@Component({
  selector: 'app-obs-studio-settings',
  templateUrl: './obs-studio-settings.component.html',
  styleUrls: ['./obs-studio-settings.component.scss'],
})
export class ObsStudioSettingsComponent {

  public connectionState: Signal<ObsConnectionState | undefined>;
  public obsConnectionStateKey = obsConnectionStateKey;
  public isConnecting: Signal<boolean>;
  public isConnected: Signal<boolean>;
  public obsIsStreaming: Signal<boolean | undefined>;
  public formGroup: FormGroup;
  public error: Signal<string | undefined>;
  public obsFeed: Signal<ObsFeed>;
  /** Translated captions are chosen but nothing is being translated, so OBS gets the original */
  public showFeedFallbackHint: Signal<boolean>;
  /** OBS stream captions (CEA-608) have no characters for the language OBS would be sent */
  public showUnsupportedLanguageHint: Signal<boolean>;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private captionTranslation: CaptionTranslationService) {

    this.connectionState = toSignal(this.store.select(selectObsConnected));
    this.error = toSignal(this.store.select(selectObsError));
    this.obsIsStreaming = toSignal(this.store.select(selectObsStreamActive));
    
    this.obsFeed = toSignal(this.store.select(selectObsFeed), { initialValue: 'original' });
    this.showFeedFallbackHint = computed(() => this.obsFeed() === 'translated' && !this.captionTranslation.active());
    this.showUnsupportedLanguageHint = computed(() => obsCannotShowLanguage(obsEffectiveLanguage({
      feed: this.obsFeed(),
      translating: this.captionTranslation.active(),
      sourceLanguage: this.captionTranslation.sourceLanguage(),
      targetLanguage: this.captionTranslation.target()
    })));

    this.isConnected = computed(() => this.connectionState() === ObsConnectionState.connected);
    this.isConnecting = computed(() => this.connectionState() === ObsConnectionState.connecting);

    this.formGroup = this.fb.group({
      ip: this.fb.control<string | null>('127.0.0.1'),
      port: this.fb.control<number | null>(null),
      password: this.fb.control<string | null>(null)
    });
  }

  public saveObsWebsocket(): void {
    this._autofillDefaultValue(this.formGroup.controls['ip'], '127.0.0.1');
    this._autofillDefaultValue(this.formGroup.controls['port'], 4455);
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {ip, port, password}: {ip: string, port: number, password: string | null} = this.formGroup.value;
      this.store.dispatch(ObsActions.connect({ ip, port, password }));
    } else {
      this.formGroup.markAsTouched();
    }
  }

  public setObsFeed(feed: ObsFeed): void {
    this.store.dispatch(SettingsActions.setObsFeed({ feed }));
  }

  public disconnect(): void {
    this.store.dispatch(ObsActions.disconnect())
  }

  private _autofillDefaultValue(control: AbstractControl, value: string | number): ValidationErrors | null {
    if (control.value === null) {
      control.patchValue(value);
    }
    return null;
  }

}
