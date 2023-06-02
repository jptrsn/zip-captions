import { Component, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AppTheme } from './models/app.model';
import { themeSelector } from './selectors/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public theme$: Observable<AppTheme>;
  constructor(private store: Store<AppState>) {
    this.theme$ = this.store.pipe(select(themeSelector));
  }

  
}
