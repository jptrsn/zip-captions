import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { CacheService } from '../../../services/cache/cache.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app.model';
import { AuthActions } from '../../../actions/auth.actions';
import { UserActions } from '../../../actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEndpoint: string;
  private userLoggedIn: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient,
              private storage: StorageService,
              private router: Router,
              private store: Store<AppState>) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
  }

  // TODO: Refactor to proper auth state check
  userIsAuthenticated(): boolean | Observable<boolean> {
    if (!this.userLoggedIn()) {
      return this.validate().pipe(
        tap((isValid: boolean) => {
          if (!isValid) {
            this.router.navigate(['auth', 'login'])
          }
        })
      )
    }
    return true;
  }

  userIsLoggedOut(): boolean | Observable<boolean> {
    if (this.userLoggedIn()) {
      this.router.navigate(['user'])
      return false;
    }
    return true;
  }

  validate(): Observable<boolean> {
    const storageToken = this.storage.get('token');
    if (storageToken) {
      return this.login(storageToken).pipe(
        map((result) => {
          this.userLoggedIn.set(true);
          this.store.dispatch(AuthActions.loginSuccess())
          this.store.dispatch(UserActions.setProfile({profile: result}))
          return true;
        }),
        catchError(() => {
          this.userLoggedIn.set(false);
          this.storage.remove('token')
          return of(false);
        })
      )
    }
    this.userLoggedIn.set(false);
    return of(false);
  }

  login(token: string): Observable<UserProfile> {
    this.storage.set('token', token);
    return this.http.get<UserProfile>(`${this.userEndpoint}/profile`).pipe(
      tap(() => this.userLoggedIn.set(true))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.userEndpoint}/logout`, {}, { responseType: 'text' }).pipe(
      catchError((err) => of(err)),
      tap((result) => console.log('logout result', result)),
      tap(() => this.storage.remove('token'))
    )
  }

  getGoogleLoginUrl(): string {
    return `${this.userEndpoint}/google-login`;
  }
  
  getAzureLoginUrl(): string {
    return `${this.userEndpoint}/azure-login`;
  }
  
}
