import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  public loggedIn: Signal<boolean | undefined>
  constructor(private store: Store<AppState>,
              private router: Router) 
  {
    this.loggedIn = toSignal(this.store.select(selectUserLoggedIn));
    
    if (this.loggedIn() === false) {
      this.router.navigate(['..', 'auth', 'login'])
    }
    
  }

  ngOnInit(): void {
    if (!this.loggedIn()) {
      this.store.dispatch(AuthActions.validate());
    }
  }
}
