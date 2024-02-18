import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-microsoft-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.scss'],
})
export class MicrosoftLoginComponent {
  public authLink: string;
  constructor(private authService: AuthService) {
    this.authLink = this.authService.getAzureLoginUrl();
  }
}
