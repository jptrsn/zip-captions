import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class GoogleApiService {
    private token?: string;
    private baseUrl = 'https://www.googleapis.com/oauth2/v3';
    
    constructor(private httpService: HttpService) {}

    setToken(access_token: string) {
        this.token = access_token;
    }

    getUser(): Promise<any> {
        if (!this.token) {
            throw new Error('No token set for google API')
        }
        const reqUrl = `${this.baseUrl}/userinfo?access_token=${this.token}`
        return firstValueFrom(this.httpService.get(reqUrl).pipe(map((response: AxiosResponse) => response.data)))
    }

    getGoogleOauthRedirect(): string {
        const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
        const state = v4()
        const clientId: string = process.env.GOOGLE_CLIENT_ID;
        const redirectUri: string = process.env.GOOGLE_REDIRECT_URI;
        const scopes: string[] = [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
          'openid'
        ];
        const args: {[key: string] : string} = {
          "client_id": clientId,
          "redirect_uri": redirectUri,
          "response_type": 'token',
          "scope": scopes.join(' '),
          "include_granted_scopes": 'true',
          "state": state.toString()
        }
        
        const search = new URLSearchParams(args).toString()
        return `${oauth2Endpoint}?${search}`;
      }
}
