import { Component, ElementRef, Renderer2, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { fadeInAnimation, fadeInOnEnterAnimation, fadeOutAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, map, startWith } from 'rxjs';
import { AppAppearanceState, AppState } from '../../../../models/app.model';
import { selectAppAppearance } from '../../../../selectors/app.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    fadeOutOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeInAnimation(),
    fadeOutAnimation()
  ]
})
export class SettingsComponent {
  
  public acceptedCookies: Signal<boolean | undefined>;
  public showUnsavedChangesModal?: boolean;
  public modalClosed$: Subject<boolean> = new Subject<boolean>();
  public tabsControl: FormControl;
  public tabIndex: Signal<number>;

  public tabNames = [
    'appearance',
    'sync',
    'sharing',
  ];
  
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
    this.tabsControl = this.fb.control(0)
    this.tabIndex = toSignal(this.tabsControl.valueChanges.pipe(takeUntilDestroyed(), startWith(0))) as Signal<number>;
    
    this.acceptedCookies = toSignal(this.store.pipe(
      select(selectAppAppearance),
      map((appearance: AppAppearanceState) => appearance.cookiesAccepted)
    ));
  }

  canDeactivate(): boolean | Observable<boolean> {
    // if (this.formGroup.dirty) {
    //   this.showUnsavedChangesModal = true;
    //   return this.modalClosed$.asObservable().pipe(take(1));
    // }
    return true;
  }

  modalClosed(value: boolean): void {
    this.showUnsavedChangesModal = false;
    this.modalClosed$.next(value);
  }

}
