import { Component } from '@angular/core';
import { AppState, AppTheme } from './models/app.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public theme$: Observable<AppTheme>;
  constructor(private store: Store<AppState>) {
    this.theme$ = this.store.select('theme');
  }
}
