import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-google-oauth-login',
  templateUrl: './google-oauth-login.component.html',
  styleUrls: ['./google-oauth-login.component.scss'],
})
export class GoogleOauthLoginComponent {
  public authLink: string;
  constructor(private authService: AuthService) {
    this.authLink = this.authService.getGoogleLoginUrl();
  }
}
