import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest, map, startWith, takeUntil } from 'rxjs';
import { AppActions, AppAppearanceState, AppState } from '../../../../models/app.model';
import { languageSelector, selectLineHeight, selectTextSize, themeSelector, wakeLockEnabledSelector } from '../../../../selectors/settings.selector';
import { AppTheme, Language, LineHeight, SettingsActions, TextSize } from '../../models/settings.model';
import { TranslateService } from '@ngx-translate/core'
import { selectAppAppearance } from '../../../../selectors/app.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup<{
    theme: FormControl<AppTheme | null>,
    lang: FormControl<Language | null>,
    wakelock: FormControl<boolean | undefined | null>,
    textSize: FormControl<TextSize | null>,
    lineHeight: FormControl<LineHeight | null>,
  }>;
  public acceptedCookies: Signal<boolean | undefined>;
  public classList: WritableSignal<string>;
  
  private onDestroy$: Subject<void> = new Subject<void>();
  private currentTheme: Signal<AppTheme>;
  private language: Signal<Language>;
  private wakeLockEnabled: Signal<boolean | undefined>;
  private currentTextSize: Signal<TextSize>;
  private currentLineHeight: Signal<LineHeight>;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private renderer: Renderer2,
              private el: ElementRef,
              private router: Router,
              private translate: TranslateService) {
    this.currentTheme = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    this.language = toSignal(this.store.select(languageSelector)) as Signal<Language>;
    this.wakeLockEnabled = toSignal(this.store.select(wakeLockEnabledSelector));
    this.currentTextSize = toSignal(this.store.select(selectTextSize)) as Signal<TextSize>;
    this.currentLineHeight = toSignal(this.store.select(selectLineHeight)) as Signal<LineHeight>;
    
    this.formGroup = this.fb.group({
      theme: this.fb.control(this.currentTheme()),
      lang: this.fb.control(this.language()),
      wakelock: this.fb.control(this.wakeLockEnabled()),
      textSize: this.fb.control(this.currentTextSize()),
      lineHeight: this.fb.control(this.currentLineHeight()),
    });

    this.acceptedCookies = toSignal(this.store.pipe(
      select(selectAppAppearance),
      map((appearance: AppAppearanceState) => appearance.cookiesAccepted)
    ));

    this.classList = signal(`recognized-text ${this.currentTextSize()} ${this.currentLineHeight()}`)
  }

  ngOnInit(): void {
    this.formGroup.get('theme')?.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((theme) => {
      if (theme) {
        this.renderer.setAttribute(this.el.nativeElement, 'data-theme', theme);
      }
    });
    this.formGroup.get('lang')?.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((lang: Language | null) => {
      if (lang) {
        this.translate.use(lang).subscribe(() => {
          // console.log('used lang', lang)
        })
      }
    });
    const size$ = this.formGroup.get('textSize')!.valueChanges.pipe(startWith(this.currentTextSize()));
    const lineHeight$ = this.formGroup.get('lineHeight')!.valueChanges.pipe(startWith(this.currentLineHeight()));
    combineLatest([size$, lineHeight$])
    .pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(([size, height]:[size: TextSize | null, height: LineHeight | null]) => {
      if (size && height) {
        this._updateClassList(size, height);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.formGroup.dirty) {
      this.translate.use(this.language());
    }
    this.onDestroy$.next();
  }

  saveSettings(): boolean {
    // TODO: Refactor save functionality to write entire settings object
    const theme: AppTheme = this.formGroup.get('theme')!.value as AppTheme;
    this.store.dispatch(SettingsActions.setTheme({theme}));
    const language: Language = this.formGroup.get('lang')!.value as Language;
    this.store.dispatch(SettingsActions.setLanguage({language}))
    const wakelockEnabled: boolean = this.formGroup.get('wakelock')!.value as boolean;
    this.store.dispatch(SettingsActions.updateWakeLockEnabled({enabled: wakelockEnabled}));
    const size: TextSize = this.formGroup.get('textSize')!.value as TextSize;
    this.store.dispatch(SettingsActions.setTextSize({size}));
    const height: LineHeight = this.formGroup.get('lineHeight')!.value as LineHeight;
    this.store.dispatch(SettingsActions.setLineHeight({height}));
    this.router.navigate([''])
    return false;
  }

  private _updateClassList(size: TextSize, height: LineHeight): void {
    console.log('updateClassList', size, height)
    this.classList.set(`recognized-text ${size} ${height}`);
  }
}
