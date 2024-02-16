import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { UserProfile } from '../../../reducers/user.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEndpoint: string;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private router: Router) {
    const baseUrl = process.env['ZIP_AUTH_API_URL'] || 'http://localhost:3000'
    const apiVersion = process.env['ZIP_AUTH_API_VERSION'] || 'v1';
    const userRoute = process.env['ZIP_USER_API_ROUTE'] || 'user';
    this.userEndpoint = `${baseUrl}/${apiVersion}/${userRoute}`;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userEndpoint}/profile`)
  }

}
