import { Component, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { selectUserLoggedIn } from '../../selectors/auth.selectors';
import { selectUserSupportProfile } from '../../selectors/user.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-supporter-render',
  templateUrl: './supporter-render.component.html',
  styleUrls: ['./supporter-render.component.scss'],
})
export class SupporterRenderComponent {
  public loggedOut: Signal<boolean | undefined>;
  public activeSupporter: Signal<boolean | undefined>;
  public following: Signal<boolean | undefined>;
  public notFollowing: Signal<boolean>;
  public patreonUrl = 'https://patreon.com/zipcaptions';
  
  constructor(private store: Store<AppState>) {
    this.loggedOut = toSignal(this.store.pipe(select(selectUserLoggedIn), map((l) => !l)));
    const profile = toSignal(this.store.select(selectUserSupportProfile));
    this.activeSupporter = computed(() => {
      const p = profile();
      return p ? !!(p.amountCents) : undefined
    });
    this.following = computed(() => {
      const p = profile();
      if (p && 'amountCents' in p) {
        return p.amountCents === 0
      }
      return undefined
    });
    this.notFollowing = computed(() => {
      return (profile() === undefined && !(this.loggedOut()))
    })
  }
}
