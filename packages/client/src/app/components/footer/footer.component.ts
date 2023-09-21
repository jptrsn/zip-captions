import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { collapseAnimation } from 'angular-animations';
import { filter, map } from 'rxjs';
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
  public activeRoute$: Signal<string | undefined>;
  public repoUrl = 'https://github.com/jptrsn/zip-captions';
  public licenseUrl = 'https://github.com/jptrsn/zip-captions/blob/main/LICENSE';
  public patreonUrl = 'https://patreon.com/zipcaptions';
  public copyrightYear = process.env['BUILD_YEAR'] || 2023;
  public buildHash = process.env['ZIP_BUILD_HASH'] || 'unknown';

  constructor(private store: Store<AppState>,
              private router: Router) {
    this.hidden = toSignal(this.store.pipe(select(footerVisibleSelector)).pipe(
      map((visible) => !visible)
    ));
    this.error$ = toSignal(this.store.select(errorSelector));
    this.activeRoute$ = toSignal(this.router.events.pipe(
      filter((ev: any) => ev instanceof NavigationEnd),
      map((ev) => ev.url),
    ))
  }
}
