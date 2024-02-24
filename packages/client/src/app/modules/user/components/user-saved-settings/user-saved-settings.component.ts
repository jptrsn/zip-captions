import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectUserSavedSettings } from '../../../../selectors/user.selector';
import { SettingsActions, SettingsState } from '../../../settings/models/settings.model';
import { selectAppSettings } from '../../../../selectors/settings.selector';
import { UserActions } from '../../../../actions/user.actions';

@Component({
  selector: 'app-user-saved-settings',
  templateUrl: './user-saved-settings.component.html',
  styleUrls: ['./user-saved-settings.component.scss'],
})
export class UserSavedSettingsComponent {

  public savedUiSettings: Signal<SettingsState | undefined>;
  public currentUiSettings: Signal<SettingsState>;
  constructor(private store: Store<AppState>) {
    this.savedUiSettings = toSignal(this.store.select(selectUserSavedSettings));
    this.currentUiSettings = toSignal(this.store.select(selectAppSettings)) as Signal<SettingsState>
  }

  applySaved(): void {
    console.log('apply saved')
    const settings = this.savedUiSettings();
    if (settings) {
      this.store.dispatch(SettingsActions.applySettings({ settings }))
    } else {
      console.error('no saved settings to apply');
    }
  }

  saveCurrent(): void {
    console.log('save current')
    this.store.dispatch(UserActions.saveSettingsState({ settings: this.currentUiSettings() }))
  }
}
