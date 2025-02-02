import { Component, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { fadeInAnimation, fadeInOnEnterAnimation, fadeOutAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Observable, Subject, map, startWith, tap } from 'rxjs';
import { AppAppearanceState, AppState } from '../../../../models/app.model';
import { selectAppAppearance } from '../../../../selectors/app.selector';
import { ActivatedRoute, Router } from '@angular/router';

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
    'transcription',
    'sync',
    'sharing',
    'obs',
		'engine'
  ];

  public tabIcons: {[key: string]: string} = {
    'appearance': 'heroSwatch',
    'transcription': 'heroDocumentText',
    'sync': 'heroArrowsRightLeft',
    'sharing': 'heroShare',
    'obs': 'obsStudioLogo',
		'engine': 'heroWrenchScrewdriver'
  }

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {

    this.acceptedCookies = toSignal(this.store.pipe(
      select(selectAppAppearance),
      map((appearance: AppAppearanceState) => appearance.cookiesAccepted)
    ));

    // The modulus operator here makes sure that the index is always less than the length of the array of tab names
    const initialTabIndex = this.route.snapshot.queryParams['tabIndex'] % this.tabNames.length || 0;
    this.tabsControl = this.fb.control(initialTabIndex);
    this.tabIndex = toSignal(this.tabsControl.valueChanges.pipe(
      takeUntilDestroyed(),
      tap((index) => {
        const params = { tabIndex: index };
        this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'})
      }),
      startWith(initialTabIndex)
    )) as Signal<number>;
  }

  modalClosed(value: boolean): void {
    this.showUnsavedChangesModal = false;
    this.modalClosed$.next(value);
  }

}
