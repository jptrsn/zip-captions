import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

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
}
