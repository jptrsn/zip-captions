import { Component, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../actions/auth.actions';
import { AppState } from '../../../../models/app.model';
import { selectAuthLoading, selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { CacheService } from '../../../../services/cache/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public loading: Signal<boolean | undefined>;
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

    this.loading = toSignal(this.store.select(selectAuthLoading))

    if (this.route.snapshot.queryParams) {
      console.log('query params', this.route.snapshot.queryParams)
      if (this.route.snapshot.queryParams['id_token']) {
        this.store.dispatch(AuthActions.login({token: this.route.snapshot.queryParams['id_token']}));
        this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {id_token: null}, relativeTo: this.route})
      } else if (this.route.snapshot.queryParams['error']) {
        this.store.dispatch(AuthActions.loginFailure({error: decodeURIComponent(this.route.snapshot.queryParams['error'])}))
        this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {error: null}, relativeTo: this.route})
      }
    }
  }

}
