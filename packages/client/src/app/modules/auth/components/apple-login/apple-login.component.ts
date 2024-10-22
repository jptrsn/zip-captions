import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-apple-login',
  templateUrl: './apple-login.component.html',
  styleUrls: ['./apple-login.component.scss'],
})
export class AppleLoginComponent {
	public authLink: string;
  constructor(private authService: AuthService) {
    this.authLink = this.authService.getAppleLoginUrl();
  }
}
