import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-google-oauth-login',
  templateUrl: './google-oauth-login.component.html',
  styleUrls: ['./google-oauth-login.component.scss'],
})
export class GoogleOauthLoginComponent {
  public authLink: Signal<string>;
  constructor(private authService: AuthService) {
    this.authLink = toSignal(this.authService.getGoogleLoginUrl()) as Signal<string>
  }
}
