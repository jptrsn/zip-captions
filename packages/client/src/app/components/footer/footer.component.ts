import { Component, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from '../../models/app.model';
import { collapseAnimation } from 'angular-animations';
import { errorSelector, footerVisibleSelector } from '../../selectors/app.selector';
import { toSignal } from '@angular/core/rxjs-interop';

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
  constructor(private store: Store<AppState>) {
    this.hidden = toSignal(this.store.pipe(select(footerVisibleSelector)).pipe(
      map((visible) => !visible)
    ));
    this.error$ = toSignal(this.store.select(errorSelector));
  }
}
