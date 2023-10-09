import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from '../../../reducers/auth.reducer';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSessionSet: WritableSignal<boolean> = signal(false);

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
          this.userSessionSet.set(true);
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
    if (this.userSessionSet()) {
      return true;
    }
    return this._checkSession().pipe(tap((hasSession) => this.userSessionSet.set(hasSession)));
  }

  logout(): Observable<{message: string}> {
    return this.http.get<{message: string}>(`${this.authEndpoint}/logout`, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('logout response', response)
        this.userSessionSet.set(false);
      })
    )
  }

  signUp(email: string, pw: string): Observable<LoginResponse> {
    const password = this._hashString(pw);
    return this.http.post<LoginResponse>(`${this.authEndpoint}/signup`, {username: email, password}, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('signUp response', response);
        if (response.uuid) {
          this.userSessionSet.set(true);
        }
      })
    )
  }

  private _hashString(input: string): string {
    return Md5.hashStr(input)
  }

  private _checkSession(): Observable<boolean> {
    return this.http.get(`${this.authEndpoint}/session`, { withCredentials: true }).pipe(
      map((resp) => {
        console.log('resp', resp)
        return true;
      })
    )
  }
}
