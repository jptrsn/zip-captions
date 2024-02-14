import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../../../services/cache/cache.service';
import { StorageService } from '../../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEndpoint: string;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private cache: CacheService) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
  }

  // TODO: Refactor to proper auth check
  userIsAuthenticated(): boolean | Observable<boolean> {
    const storageToken = this.storage.get('token');
    if (storageToken) {
      return this.login(storageToken);
    }
    return false;
  }

  login(token: string): Observable<any> {
    this.storage.set('token', token);
    return this.http.get(`${this.userEndpoint}/profile`).pipe(
      tap((loginResponse) => console.log('login response', loginResponse))
      )
  }

  logout(): Observable<any> {
    return this.http.get(`${this.userEndpoint}/logout`).pipe(
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
