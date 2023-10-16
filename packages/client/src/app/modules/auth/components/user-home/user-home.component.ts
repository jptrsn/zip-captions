import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { AuthActions } from '../../../../actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent {
  constructor(private store: Store<AppState>,
              private router: Router) {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate([''])
  }
}
