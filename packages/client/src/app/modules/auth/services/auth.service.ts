import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userIsAuthenticated: WritableSignal<boolean> = signal(false);

  private authEndpoint: string;
  constructor(private http: HttpClient) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost'
    const apiPort = process.env['ZIP_AUTH_API_PORT'] || '3000';
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const authRoute = process.env['ZIP_AUTH_API_ROUTE'] || 'auth';
    this.authEndpoint = `${baseUrl}:${apiPort}/${apiVersion}/${authRoute}`;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authEndpoint}/login`, { username: email, password }, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('login response', response)
        if (response.uuid) {
          this.userIsAuthenticated.set(true);
        }
      })
    )
  }

  validate(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authEndpoint}/validate`, { username: email, password }, { withCredentials: true }).pipe(
      tap((response) => console.log('validate response', response))
    )
  }

  logout(): Observable<{message: string}> {
    return this.http.get<{message: string}>(`${this.authEndpoint}/logout`, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('logout response', response)
        this.userIsAuthenticated.set(false);
      })
    )
  }

  signUp(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authEndpoint}/signup`, {username: email, password}, { withCredentials: true }).pipe(
      tap((response) => {
        console.log('signUp response', response);
        this.userIsAuthenticated.set(!!response.uuid);
      })
    )
  }
}
