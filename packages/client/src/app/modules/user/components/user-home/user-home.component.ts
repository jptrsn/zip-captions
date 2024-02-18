import { Component, OnInit, effect } from '@angular/core';
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
  constructor(private store: Store<AppState>,
              private router: Router) 
  {
    const loggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (loggedIn() === false) {
        this.router.navigate([''])
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.validate());
  }
}
