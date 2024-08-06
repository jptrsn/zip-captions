import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AppState } from '../../../models/app.model';
import { selectUserLoggedIn } from '../../../selectors/auth.selectors';
import { StorageService } from '../../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEndpoint: string;
  private userLoggedIn: Signal<boolean | undefined>;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private router: Router,
              private store: Store<AppState>) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
    this.userLoggedIn = toSignal(this.store.select(selectUserLoggedIn))
  }

  userIsAuthenticated(): boolean | Observable<boolean> {
    if (!this.userLoggedIn()) {
      return this.login().pipe(
        map((id: string | null) => {
          if (!id) {
            this.router.navigate(['auth', 'login']);
          }
          return !!id;
        }),
        catchError(() => {
          this.router.navigate(['auth', 'login']);
          return of(false);
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

  login(): Observable<string | null> {
    if (!this.storage.get('token')) {
      console.log('no token for validation');
      return of(null);
    }
    return this.http.get<{id: string | null}>(`${this.userEndpoint}/validate`).pipe(
      map(({ id }) => {
        return id
      }),
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.userEndpoint}/logout`, {}, { responseType: 'text' }).pipe(
      catchError((err) => of(err)),
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
