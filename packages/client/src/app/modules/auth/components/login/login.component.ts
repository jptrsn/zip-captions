import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {

    const userLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (userLoggedIn()) {
        this.router.navigate(['auth', 'user']);
      }
    });

    if (this.route.snapshot.fragment) {
      if (this.route.snapshot.fragment.match("access_token")) {
        console.log('parse fragment')
        this.store.dispatch(AuthActions.loginWithAccessToken({ token: this.route.snapshot.fragment }))
      }
    }
  }

}
