import { Component, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { FormBuilder, FormControl } from '@angular/forms';
import { tap, startWith } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  public loggedIn: Signal<boolean | undefined>;
  public tabsControl: FormControl;
  public tabIndex: Signal<number>;
  public tabNames = [
    'account',
    'transcripts'
  ]
  constructor(private store: Store<AppState>,
              private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute) 
  {
    this.loggedIn = toSignal(this.store.select(selectUserLoggedIn));
    
    if (this.loggedIn() === false) {
      this.router.navigate(['..', 'auth', 'login'])
    }

    // The modulus operator here makes sure that the index is always less than the length of the array of tab names
    const initialTabIndex = this.route.snapshot.queryParams['tabIndex'] % this.tabNames.length || 0;
    this.tabsControl = this.fb.control(initialTabIndex)
    this.tabIndex = toSignal(this.tabsControl.valueChanges.pipe(
      takeUntilDestroyed(), 
      tap((index) => {
        const params = { tabIndex: index };
        this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'})
      }),
      startWith(initialTabIndex)
    )) as Signal<number>;
  }

  ngOnInit(): void {
    if (!this.loggedIn()) {
      this.store.dispatch(AuthActions.validate());
    }
  }
}
