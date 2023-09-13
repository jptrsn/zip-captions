import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { collapseAnimation } from 'angular-animations';
import { map } from 'rxjs';
import { AppState } from '../../models/app.model';
import { errorSelector, footerVisibleSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    collapseAnimation()
  ]
})
export class FooterComponent {
  public hidden: Signal<boolean | undefined>;
  public error$: Signal<string | undefined>;
  public repoUrl = 'https://github.com/jptrsn/zip-captions';
  public licenseUrl = 'https://github.com/jptrsn/zip-captions/blob/main/LICENSE';
  public patreonUrl = 'https://patreon.com/zipcaptions';
  constructor(private store: Store<AppState>) {
    this.hidden = toSignal(this.store.pipe(select(footerVisibleSelector)).pipe(
      map((visible) => !visible)
    ));
    this.error$ = toSignal(this.store.select(errorSelector));
  }
}
