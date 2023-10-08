import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = process.env['ZIP_AUTH_URL'] || 'http://localhost:3000/v1/auth';
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username: email, password })
  }
}
