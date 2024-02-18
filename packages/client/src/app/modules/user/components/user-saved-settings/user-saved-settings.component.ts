import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectUserSavedSettings } from '../../../../selectors/user.selector';
import { SettingsState } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-user-saved-settings',
  templateUrl: './user-saved-settings.component.html',
  styleUrls: ['./user-saved-settings.component.scss'],
})
export class UserSavedSettingsComponent {

  public savedUiSettings: Signal<SettingsState | undefined>;
  constructor(private store: Store<AppState>) {
    this.savedUiSettings = toSignal(this.store.select(selectUserSavedSettings));
  }
}