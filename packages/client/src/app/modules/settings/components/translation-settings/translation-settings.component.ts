import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { SettingsActions } from '../../models/settings.model';
import { AvailableTranslationLanguages, SupportedTranslationLanguage, TranslationDisplayMode, TranslationSettings } from '../../models/settings.model';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { ChromeTranslatorService, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';

@Component({
  selector: 'app-translation-settings',
  templateUrl: './translation-settings.component.html',
  styleUrls: ['./translation-settings.component.scss']
})
export class TranslationSettingsComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public languages: SupportedTranslationLanguage[] = AvailableTranslationLanguages;
  public isSupported: boolean;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;

  public currentSettings: Signal<TranslationSettings | undefined>;
  public sourceDialect: Signal<string | undefined>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public translatorService: ChromeTranslatorService
  ) {
    this.isSupported = this.translatorService.isSupported();
    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;

    this.currentSettings = toSignal(this.store.select(selectTranslationSettings));
    this.sourceDialect = toSignal(this.store.select(dialectSelector));

    this.formGroup = this.fb.group({
      enabled: [false],
      mode: ['split'],
      targetLanguage: ['es']
    });

    // Initialize form with stored settings
    const settings = this.currentSettings();
    if (settings) {
      this.formGroup.patchValue({
        enabled: settings.enabled,
        mode: settings.mode === 'off' ? 'split' : settings.mode,
        targetLanguage: settings.targetLanguage || 'es'
      });
    }

    // Check model status when target language changes
    this.formGroup.controls['targetLanguage'].valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((tgt) => {
      const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
      this.translatorService.checkModelStatus(src, tgt);
    });
  }

  ngOnInit(): void {
    const settings = this.currentSettings();
    if (settings) {
      this.formGroup.reset({
        enabled: settings.enabled,
        mode: settings.mode === 'off' ? 'split' : settings.mode,
        targetLanguage: settings.targetLanguage || 'es'
      });
    }
    const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
    const tgt = this.formGroup.get('targetLanguage')?.value || 'es';
    this.translatorService.checkModelStatus(src, tgt);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public downloadModel(): void {
    const formVal = this.formGroup.value;
    const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
    this.translatorService.downloadModel(src, formVal.targetLanguage);
  }

  saveSettings(): void {
    const formVal = this.formGroup.value;
    const mode: TranslationDisplayMode = formVal.enabled ? formVal.mode : 'off';

    this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: formVal.enabled }));
    this.store.dispatch(SettingsActions.setTranslationMode({ mode }));
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: formVal.targetLanguage }));

    this.formGroup.markAsPristine();

    // Trigger pre-download / warm-up of the model if enabled
    if (formVal.enabled && this.isSupported) {
      const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
      this.translatorService.downloadModel(src, formVal.targetLanguage).catch((err) => {
        console.warn('Could not warm up translator:', err);
      });
    }
  }
}
