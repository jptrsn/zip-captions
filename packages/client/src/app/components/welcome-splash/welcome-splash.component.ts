import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { selectUserLoggedIn } from '../../selectors/auth.selectors';

@Component({
  selector: 'app-welcome-splash',
  templateUrl: './welcome-splash.component.html',
  styleUrls: ['./welcome-splash.component.scss'],
})
export class WelcomeSplashComponent {
  public isLoggedIn: Signal<boolean | undefined>;
  
  constructor(private store: Store<AppState>) {
    this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
  }
}
