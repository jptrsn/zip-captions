import { Component, OnDestroy, OnInit, Signal, effect } from '@angular/core';
import { AppActions, AppState, AppTheme } from '../../models/app.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { themeSelector } from '../../selectors/app.selector';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  public themes = AppTheme;
  public formGroup: FormGroup<{theme: FormControl<AppTheme | null>}>;

  private onDestroy$: Subject<void> = new Subject<void>();
  private currentTheme: Signal<AppTheme>;
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
                
    this.currentTheme = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    this.formGroup = this.fb.group(
      {theme: this.fb.control(this.currentTheme())}
    )
  }

  ngOnInit(): void {
    this.formGroup.get('theme')?.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((theme) => {
      if (theme && theme !== this.currentTheme()) {
        this.store.dispatch(AppActions.setTheme({theme}))
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  previewTheme(theme: any): void {
    console.log('previewTheme', theme)
    // this.store.dispatch(AppActions.setTheme({theme}))
  }
}
