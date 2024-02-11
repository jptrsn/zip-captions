import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheService } from '../../../services/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userHasAuth: WritableSignal<boolean> = signal(false);
  private authEndpoint: string;
  private userEndpoint: string;

  constructor(private http: HttpClient,
              private cache: CacheService) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const authRoute = process.env['ZIP_AUTH_API_ROUTE'] || 'auth';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.authEndpoint = `${baseUrl}/${apiVersion}/${authRoute}`;
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
  }

  // TODO: Refactor to proper auth check
  userIsAuthenticated(): boolean {
    if (this.userHasAuth()) {
      return true;
    }
    console.log('CHECK user authentication here')
    return false;
  }

  logout(): Observable<{message: string}> {
    this.userHasAuth.set(false);
    this.cache.remove('google_fragment')
    return of({message: 'ok'})
  }

  getGoogleLoginUrl(): string {
    return `${this.userEndpoint}/google-login`;
  }
  
  getAzureLoginUrl(): string {
    return `${this.userEndpoint}/azure-login`;
  }

  private _checkSession(): Observable<boolean> {
    console.log('check session')
    return of(false)
  }
  
}
