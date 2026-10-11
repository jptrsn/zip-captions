import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, startWith, takeUntil } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { InterfaceLanguage, RecognitionDialect, SettingsActions, isSpokenLanguage, swapLanguagePair } from '../../models/settings.model';
import { AvailableTranslationLanguages, SupportedTranslationLanguage, TranslationDisplayMode, TranslationSettings } from '../../models/settings.model';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../../../selectors/settings.selector';
import { ChromeTranslatorService, TranslationModelStatus, TranslationUnsupportedReason } from '../../../../services/translator/chrome-translator.service';

@Component({
  selector: 'app-translation-settings',
  templateUrl: './translation-settings.component.html',
  styleUrls: ['./translation-settings.component.scss']
})
export class TranslationSettingsComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public availableLanguages: Signal<SupportedTranslationLanguage[]>;
  public isSupported: boolean;
  public unsupportedReason: TranslationUnsupportedReason | undefined;
  public modelStatus: Signal<TranslationModelStatus>;
  public downloadProgress: Signal<number>;

  public currentSettings: Signal<TranslationSettings | undefined>;
  public sourceDialect: Signal<string | undefined>;
  private storedLanguage: Signal<InterfaceLanguage | undefined>;
  public sourceLanguageCode: Signal<string>;
  public spokenLanguage: Signal<InterfaceLanguage>;
  public canSwap: Signal<boolean>;
  public readonly modelManagementUrl = 'https://developer.chrome.com/docs/ai/understand-built-in-model-management';

  private onDestroy$: Subject<void> = new Subject<void>();
  // Set while a swap patches the form, so the spoken-language change keeps the swapped dialect
  private swappingTo?: InterfaceLanguage;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public translatorService: ChromeTranslatorService
  ) {
    this.isSupported = this.translatorService.isSupported();
    this.unsupportedReason = this.translatorService.unsupportedReason();
    this.modelStatus = this.translatorService.modelStatus;
    this.downloadProgress = this.translatorService.downloadProgress;

    this.currentSettings = toSignal(this.store.select(selectTranslationSettings));
    this.sourceDialect = toSignal(this.store.select(dialectSelector));
    const sourceLang = toSignal(this.store.select(languageSelector));
    this.storedLanguage = sourceLang as Signal<InterfaceLanguage | undefined>;

    // Initialize form with stored settings, ensuring no collision with current captioning language
    const settings = this.currentSettings();
    const storedDialect = this.sourceDialect();
    const srcCode = this.translatorService.normalizeLanguageCode(storedDialect && storedDialect !== 'unspecified' ? storedDialect : sourceLang());
    let initialTarget = settings?.targetLanguage || (srcCode === 'es' ? 'en' : 'es');
    initialTarget = this.ensureDifferentTargetLanguage(srcCode, initialTarget);

    this.formGroup = this.fb.group({
      enabled: [false],
      mode: ['split'],
      spokenLanguage: [sourceLang() as InterfaceLanguage],
      dialect: [storedDialect ?? 'unspecified'],
      targetLanguage: [initialTarget]
    });

    // The spoken language being edited, before it is saved
    this.spokenLanguage = toSignal(this.formGroup.controls['spokenLanguage'].valueChanges.pipe(
      startWith(this.formGroup.controls['spokenLanguage'].value)
    )) as Signal<InterfaceLanguage>;
    const formDialect = toSignal(this.formGroup.controls['dialect'].valueChanges.pipe(
      startWith(this.formGroup.controls['dialect'].value)
    )) as Signal<RecognitionDialect>;
    const formTarget = toSignal(this.formGroup.controls['targetLanguage'].valueChanges.pipe(
      startWith(this.formGroup.controls['targetLanguage'].value)
    )) as Signal<string>;

    this.sourceLanguageCode = computed(() => {
      const d = formDialect();
      if (d && d !== 'unspecified') return this.translatorService.normalizeLanguageCode(d);
      return this.translatorService.normalizeLanguageCode(this.spokenLanguage());
    });

    this.availableLanguages = computed(() => {
      const src = this.sourceLanguageCode();
      return AvailableTranslationLanguages.filter((l) => l.code !== src);
    });

    this.canSwap = computed(() => isSpokenLanguage(formTarget()));

    // A different spoken language starts from its default dialect, as in the appearance settings
    this.formGroup.controls['spokenLanguage'].valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((lang) => {
      if (lang && lang !== this.swappingTo) {
        this.formGroup.controls['dialect'].setValue('unspecified');
      }
    });

    if (settings) {
      this.formGroup.patchValue({
        enabled: settings.enabled,
        mode: settings.mode === 'off' ? 'split' : settings.mode,
        targetLanguage: initialTarget
      }, { emitEvent: false });
    }

    // Translation can't run on this device, so the stored settings are shown read-only
    if (!this.isSupported) {
      this.formGroup.disable();
    }

    // Check model status when target language changes
    this.formGroup.controls['targetLanguage'].valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((tgt) => {
      this.translatorService.checkModelStatus(this.formSource(), tgt);
    });

    // Auto-update target language if source captioning language changes to match target
    toObservable(this.sourceLanguageCode).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((src) => {
      const currentTgt = this.formGroup.get('targetLanguage')?.value;
      if (currentTgt === src) {
        // Form only: the spoken language is unsaved here, and saving applies the new target
        const nextTgt = this.ensureDifferentTargetLanguage(src, currentTgt);
        this.formGroup.controls['targetLanguage'].setValue(nextTgt);
        this.formGroup.markAsDirty();
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
        spokenLanguage: this.formGroup.get('spokenLanguage')?.value,
        dialect: this.formGroup.get('dialect')?.value,
        targetLanguage: target
      }, { emitEvent: false });
    }
    this.translatorService.checkModelStatus(this.formSource(), target);
  }

  /** Swaps the spoken and translation languages in the form; saving applies them */
  public swapLanguages(): void {
    const swapped = swapLanguagePair({
      lang: this.formGroup.get('spokenLanguage')?.value,
      dialect: this.formGroup.get('dialect')?.value ?? 'unspecified',
      targetLanguage: this.formGroup.get('targetLanguage')?.value,
      dialectByLanguage: this.currentSettings()?.dialectByLanguage,
    });
    if (!swapped) return;
    this.swappingTo = swapped.lang;
    this.formGroup.patchValue({
      spokenLanguage: swapped.lang,
      dialect: swapped.dialect,
      targetLanguage: swapped.targetLanguage,
    });
    this.swappingTo = undefined;
    this.formGroup.markAsDirty();
  }

  // Source for model checks: the form's dialect, else the spoken language's default
  private formSource(): string {
    const dialect = this.formGroup.get('dialect')?.value;
    return dialect && dialect !== 'unspecified' ? dialect : this.formGroup.get('spokenLanguage')?.value ?? 'en';
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public downloadModel(): void {
    const formVal = this.formGroup.value;
    this.translatorService.downloadModel(this.formSource(), formVal.targetLanguage);
  }

  saveSettings(): void {
    const formVal = this.formGroup.value;
    const mode: TranslationDisplayMode = formVal.enabled ? formVal.mode : 'off';

    // Spoken language before the target, so the target-collision rule sees the new source
    if (formVal.spokenLanguage && formVal.spokenLanguage !== this.storedLanguage()) {
      this.store.dispatch(SettingsActions.setLanguage({ language: formVal.spokenLanguage }));
    }
    if (formVal.dialect && formVal.dialect !== this.sourceDialect()) {
      this.store.dispatch(SettingsActions.setDialect({ dialect: formVal.dialect }));
    }
    this.store.dispatch(SettingsActions.setTranslationEnabled({ enabled: formVal.enabled }));
    this.store.dispatch(SettingsActions.setTranslationMode({ mode }));
    this.store.dispatch(SettingsActions.setTranslationTargetLanguage({ targetLanguage: formVal.targetLanguage }));

    this.formGroup.markAsPristine();

    // Trigger pre-download / warm-up of the model if enabled
    if (formVal.enabled && this.isSupported) {
      this.translatorService.downloadModel(this.formSource(), formVal.targetLanguage).catch((err) => {
        console.warn('Could not warm up translator:', err);
      });
    }
  }
}
