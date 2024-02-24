import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { UserActions } from '../../../actions/user.actions';
import { AppState } from '../../../models/app.model';
import { UserProfile } from '../../../reducers/user.reducer';
import { selectUserId } from '../../../selectors/user.selector';
import { SettingsState } from '../../settings/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEndpoint: string;
  private userId: Signal<string | undefined>;
  constructor(private http: HttpClient,
              private store: Store<AppState>) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
    this.userId = toSignal(this.store.select(selectUserId))
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    if (!this.userId()) {
      this.store.dispatch(UserActions.setUserID({ id: userId }))
    }
    return this.http.get<UserProfile>(`${this.userEndpoint}/profile/${userId}`)
  }

  getUiSettings(): Observable<SettingsState> {
    const id = this.userId();
    if (!id) {
      throw new Error('No user ID set')
    }
    return this.http.get<SettingsState>(`${this.userEndpoint}/profile/${id}/settings`)
  }

  saveUiSettings(settings: SettingsState): Observable<SettingsState> {
    const id = this.userId();
    if (!id) {
      throw new Error('No user ID set')
    }
    return this.http.post<SettingsState>(`${this.userEndpoint}/profile/${id}/settings`, { settings })
  }

}
