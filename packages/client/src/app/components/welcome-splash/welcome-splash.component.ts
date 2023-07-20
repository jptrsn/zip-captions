import { Component, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppPlatform, AppState } from '../../models/app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { platformSelector } from '../../selectors/app.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-welcome-splash',
  templateUrl: './welcome-splash.component.html',
  styleUrls: ['./welcome-splash.component.scss'],
})
export class WelcomeSplashComponent {
  public isMobile: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.isMobile = toSignal(this.store.pipe(select(platformSelector), map((platform) => platform === AppPlatform.mobile)))
  }
}
