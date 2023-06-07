import { Component, ElementRef, OnDestroy, OnInit, Renderer2, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppActions, AppState, AppTheme, Language } from '../../models/app.model';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { languageSelector, themeSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup<{
    theme: FormControl<AppTheme | null>,
    lang: FormControl<Language | null>
  }>;
  
  private onDestroy$: Subject<void> = new Subject<void>();
  private currentTheme: Signal<AppTheme>;
  private language: Signal<Language>;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private renderer: Renderer2,
              private el: ElementRef) {
    this.currentTheme = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    this.language = toSignal(this.store.select(languageSelector)) as Signal<Language>;
    
    this.formGroup = this.fb.group({
      theme: this.fb.control(this.currentTheme()),
      lang: this.fb.control(this.language())
    });
  }

  ngOnInit(): void {
    this.formGroup.get('theme')?.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((theme) => {
      if (theme) {
        this.renderer.setAttribute(this.el.nativeElement, 'data-theme', theme);
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  saveSettings(): void {
    const theme: AppTheme = this.formGroup.get('theme')!.value as AppTheme;
    this.store.dispatch(AppActions.setTheme({theme}))
  }
}
