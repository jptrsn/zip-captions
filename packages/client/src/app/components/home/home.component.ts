import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { loadingSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loading: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) { 
    this.loading = toSignal(this.store.pipe(select(loadingSelector)))
  }
}
