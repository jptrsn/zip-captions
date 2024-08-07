import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patreon-login',
  templateUrl: './patreon-login.component.html',
  styleUrls: ['./patreon-login.component.scss'],
})
export class PatreonLoginComponent {
  public authLink: string;
  constructor(private authService: AuthService) {
    this.authLink = this.authService.getPatreonLoginUrl();
  }
}
