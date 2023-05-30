import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from '../../models/app.model';
import { collapseAnimation } from 'angular-animations';
import { footerVisibleSelector } from '../../selectors/app.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    collapseAnimation()
  ]
})
export class FooterComponent {
  public hidden$: Observable<boolean>;
  public repoUrl = 'https://github.com/jptrsn/zip-captions';
  constructor(private store: Store<AppState>) {
    this.hidden$ = this.store.pipe(select(footerVisibleSelector)).pipe(
      map((visible) => !visible)
    )
  }
}
