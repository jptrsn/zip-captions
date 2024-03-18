import { Component, Signal, ViewEncapsulation, computed, effect } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectUserId, selectUserSavedSettings, selectUserSettingsSync } from '../../../../selectors/user.selector';
import { SettingsActions, SettingsState } from '../../../settings/models/settings.model';
import { selectAppSettings } from '../../../../selectors/settings.selector';
import { UserActions } from '../../../../actions/user.actions';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-saved-settings',
  templateUrl: './user-saved-settings.component.html',
  styleUrls: ['./user-saved-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserSavedSettingsComponent {

  public savedUiSettings: Signal<SettingsState | undefined>;
  public currentUiSettings: Signal<SettingsState>;
  public settingsMatch: Signal<boolean>;
  public viewingSaved: boolean;
  public syncControl: FormControl<boolean | null>;

  private syncSettings: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    
    this.viewingSaved = false;
    
    this.syncSettings = toSignal(this.store.select(selectUserSettingsSync));
    this.syncControl = this.fb.control<boolean | null>(null);
    this.savedUiSettings = toSignal(this.store.select(selectUserSavedSettings));
    this.currentUiSettings = toSignal(this.store.select(selectAppSettings)) as Signal<SettingsState>;
    const userId = toSignal(this.store.select(selectUserId))
    
    effect(() => {
      if (userId()) {
        this.store.dispatch(UserActions.getSettings())
      }
    }, { allowSignalWrites: true})

    effect(() => {
      const sync = this.syncSettings();
      if (sync !== undefined) {
        this.syncControl.setValue(sync, {emitEvent: false})
      }
    })
    
    this.settingsMatch = computed(() => {
      const saved = this.savedUiSettings();
      const current = this.currentUiSettings();
      if (saved && current) {
        return Object.keys(saved).length === Object.keys(current).length &&
        (Object.keys(saved) as (keyof SettingsState)[]).every((key) => 
          (key in current && saved[key] == current[key])
        )
      }
      return false;
    })

    this.syncControl.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe((newValue) => {
      this.store.dispatch(UserActions.saveSyncProperty({ sync: !!newValue }))
    })
    
  }

  applySaved(): void {
    const settings = this.savedUiSettings();
    if (settings) {
      this.store.dispatch(SettingsActions.applySettings({ settings }))
    } else {
      this.store.dispatch(UserActions.getSettingsFailure({ error: 'No saved settings loaded into memory'}))
    }
  }

  saveCurrent(): void {
    this.store.dispatch(UserActions.saveSettingsState({ settings: this.currentUiSettings() }))
  }

  toggleView(): void {
    this.viewingSaved = !this.viewingSaved;
  }
  
}
