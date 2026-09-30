import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { SettingsActions } from '../../models/settings.model';
import { AvailableTranslationLanguages, SupportedTranslationLanguage, TranslationDisplayMode, TranslationSettings } from '../../models/settings.model';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { ChromeTranslatorService, SystemRequirementsStatus, TranslationModelStatus } from '../../../../services/translator/chrome-translator.service';

@Component({
  selector: 'app-translation-settings',
  templateUrl: './translation-settings.component.html',
  styleUrls: ['./translation-settings.component.scss']
})
export class TranslationSettingsComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  public isSupported: boolean;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;
  public systemRequirements: Signal<SystemRequirementsStatus>;

  public currentSettings: Signal<TranslationSettings | undefined>;
  public sourceDialect: Signal<string | undefined>;
  public sourceLanguageCode: Signal<string>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public translatorService: ChromeTranslatorService
  ) {
    this.isSupported = this.translatorService.isSupported();
    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;
    this.systemRequirements = this.translatorService.systemRequirements;

    this.currentSettings = toSignal(this.store.select(selectTranslationSettings));
    this.sourceDialect = toSignal(this.store.select(dialectSelector));
    const sourceLang = toSignal(this.store.select(languageSelector));

    this.sourceLanguageCode = computed(() => {
      const d = this.sourceDialect();
      if (d && d !== 'unspecified') return this.translatorService.normalizeLanguageCode(d);
      return this.translatorService.normalizeLanguageCode(sourceLang());
    });

    this.availableLanguages = computed(() => {
      const src = this.sourceLanguageCode();
      return AvailableTranslationLanguages.filter((l) => l.code !== src);
    });

    // Initialize form with stored settings, ensuring no collision with current captioning language
    const settings = this.currentSettings();
    const srcCode = this.sourceLanguageCode();
    let initialTarget = settings?.targetLanguage || (srcCode === 'es' ? 'en' : 'es');
    initialTarget = this.ensureDifferentTargetLanguage(srcCode, initialTarget);

    this.formGroup = this.fb.group({
      enabled: [false],
      mode: ['split'],
      targetLanguage: [initialTarget]
    });

    if (settings) {
      this.formGroup.patchValue({
        enabled: settings.enabled,
        mode: settings.mode === 'off' ? 'split' : settings.mode,
        targetLanguage: initialTarget
      });
    }

    // Check model status when target language changes
    this.formGroup.controls['targetLanguage'].valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((tgt) => {
      const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
      this.translatorService.checkModelStatus(src, tgt);
    });

    // Auto-update target language if source captioning language changes to match target
    toObservable(this.sourceLanguageCode).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((src) => {
      const currentTgt = this.formGroup.get('targetLanguage')?.value;
      if (currentTgt === src) {
        const nextTgt = this.ensureDifferentTargetLanguage(src, currentTgt);
        this.formGroup.controls['targetLanguage'].setValue(nextTgt);
        this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: nextTgt }));
      }
    });
  }

  private ensureDifferentTargetLanguage(src: string, currentTgt: string): string {
    if (src !== currentTgt) return currentTgt;
    const alt = src === 'es' ? 'en' : 'es';
    const exists = AvailableTranslationLanguages.some((l) => l.code === alt && l.code !== src);
    if (exists) return alt;
    const firstOther = AvailableTranslationLanguages.find((l) => l.code !== src);
    return firstOther ? firstOther.code : 'es';
  }

  ngOnInit(): void {
    const settings = this.currentSettings();
    const srcCode = this.sourceLanguageCode();
    let target = settings?.targetLanguage || this.formGroup.get('targetLanguage')?.value || 'es';
    target = this.ensureDifferentTargetLanguage(srcCode, target);

    if (settings) {
      this.formGroup.reset({
        enabled: settings.enabled,
        mode: settings.mode === 'off' ? 'split' : settings.mode,
        targetLanguage: target
      });
    }
    const src = this.sourceDialect() && this.sourceDialect() !== 'unspecified' ? this.sourceDialect()! : 'en';
    this.translatorService.checkModelStatus(src, target);
    this.translatorService.checkSystemRequirements();
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
