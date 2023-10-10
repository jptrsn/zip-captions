import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from '../../../reducers/auth.reducer';
import { Md5 } from 'ts-md5';
import { SignInTokenResponse } from 'shared-ui';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSessionExists: WritableSignal<boolean> = signal(false);

  private authEndpoint: string;
  constructor(private http: HttpClient) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost'
    const apiPort = process.env['ZIP_AUTH_API_PORT'] || '3000';
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const authRoute = process.env['ZIP_AUTH_API_ROUTE'] || 'auth';
    this.authEndpoint = `${baseUrl}:${apiPort}/${apiVersion}/${authRoute}`;
  }

  login(email: string, pw: string): Observable<LoginResponse> {
    const password = this._hashString(pw);
    return this.http.post<LoginResponse>(`${this.authEndpoint}/login`, { username: email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('login response', response)
        if (response.uuid) {
          this.userSessionExists.set(true);
        }
      })
    )
  }

  validate(email: string, pw: string): Observable<LoginResponse> {
    const password = this._hashString(pw);
    return this.http.post<LoginResponse>(`${this.authEndpoint}/validate`, { username: email, password }, { withCredentials: true }).pipe(
      tap((response) => console.log('validate response', response))
    )
  }

  // TODO: Refactor to proper - user has session, not auth
  userIsAuthenticated(): boolean | Observable<boolean> {
    if (this.userSessionExists()) {
      return true;
    }
    return this._checkSession().pipe(tap((hasSession) => this.userSessionExists.set(hasSession)));
  }

  logout(): Observable<{message: string}> {
    return this.http.get<{message: string}>(`${this.authEndpoint}/logout`, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('logout response', response)
        this.userSessionExists.set(false);
      })
    )
  }

  signUp(email: string, pw: string): Observable<LoginResponse> {
    const password = this._hashString(pw);
    return this.http.post<LoginResponse>(`${this.authEndpoint}/signup`, {username: email, password}, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('signUp response', response);
        if (response.uuid) {
          this.userSessionExists.set(true);
        }
      })
    )
  }

  loginWithGoogle(creds: SignInTokenResponse): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authEndpoint}/loginWithGoogle`, { creds }).pipe(
      tap((response) => {
        console.log('loginWithGoogle response', response);
        if (response.uuid) {
          this.userSessionExists.set(true);
        }
      })
    )
  }

  private _hashString(input: string): string {
    return Md5.hashStr(input)
  }

  private _checkSession(): Observable<boolean> {
    return this.http.get<LoginResponse>(`${this.authEndpoint}/session`, { withCredentials: true }).pipe(
      map((response) => {
        // TODO: dispatch state if not set already
        return true;
      }),
      catchError(() => of(false))
    )
  }
}
