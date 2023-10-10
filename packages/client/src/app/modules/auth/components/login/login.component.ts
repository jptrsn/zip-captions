import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private store: Store<AppState>,
              private router: Router) {

    const userLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (userLoggedIn()) {
        this.router.navigate(['auth', 'user']);
      }
    });
  }

}
