import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { CacheService } from '../../../../services/cache/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private cache: CacheService) {

    const userLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      if (userLoggedIn()) {
        this.router.navigate(['auth', 'user']);
      }
    });

    if (this.route.snapshot.fragment) {
      if (this.route.snapshot.fragment.match("access_token")) {
        this.store.dispatch(AuthActions.loginWithGoogleToken({ fragment: this.route.snapshot.fragment }))
      }
    } else {
      const cachedFragment = this.cache.load<{fragment: string}>('google_fragment')
      if (cachedFragment) {
        console.log('loaded cached fragment', cachedFragment)
        this.store.dispatch(AuthActions.loginWithGoogleToken({ fragment: cachedFragment.fragment }))
      }
    }
  }

}
