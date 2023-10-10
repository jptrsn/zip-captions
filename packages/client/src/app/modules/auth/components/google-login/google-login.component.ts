import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild, WritableSignal, signal } from '@angular/core';
import { SignInTokenResponse } from '../../models/google-auth.model';
import { AppState } from '../../../../models/app.model';
import { Store } from '@ngrx/store';
import { AuthActions } from 'packages/client/src/app/actions/auth.actions';

declare let google: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {
  @ViewChild('signInButton', {read: ElementRef}) button!: ElementRef<HTMLDivElement>;
  disabled: WritableSignal<boolean> = signal(false);
  error: WritableSignal<string | undefined> = signal(undefined);
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private zone: NgZone,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this._loadClientLib();
  }

  onLibLoad(): void {
    google.accounts.id.initialize({
      client_id: '374403697962-n3m6fa49ojjub0urrid4ojotff4hhdf2.apps.googleusercontent.com',
      callback: (resp: SignInTokenResponse) => this.onSignIn(resp),
      context: 'use',
      cancel_on_tap_outside: false,
      ux_mode: 'popup',
      itp_support: true,
      use_fedcm_for_prompt: true
    })
    google.accounts.id.renderButton(this.document.getElementById('g_signin'), { theme: 'filled_blue', size: 'large', width: '250'})
    this.prompt();
  }

  prompt(): void {
    google.accounts.id.prompt((notification: any) => {
      console.log('prompt notification', notification);
      this.disabled.set((notification.g === 'display'));
      console.log('isNotDisplayed', notification.isNotDisplayed());
      console.log('isSkippedMoment', notification.isSkippedMoment());
      if (notification.isNotDisplayed()) {
        console.log('j', notification.j);
        let msg = 'Error';
        if (notification.j === 'opt_out_or_no_session') {
          msg = 'opted out, or no session available';
        } else if (notification.j === 'suppressed_by_user') {
          msg = 'suppressed by user';
        }
        this.error.set(msg)
      } else if (notification.isSkippedMoment()) {
        this.error.set('skipped or disabled by user')
        this.disabled.set(true);
      } else if (notification.i) {
        console.log('i', notification.i);
      }
    })
  }

  onSignIn(token: SignInTokenResponse): void {
    this.zone.run(() => this.disabled.set(true));
    console.log('onSignIn', token);
    this.store.dispatch(AuthActions.loginWithGoogle({ token }))
  }

  clearError(): void {
    this.error.set(undefined);
    this.disabled.set(false);
  }

  private _loadClientLib(): HTMLScriptElement {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'text/javascript')
    this.renderer.setAttribute(script, 'src', 'https://accounts.google.com/gsi/client');
    script.onload = () => this.onLibLoad();
    script.onerror = (err: any) => console.log('script error', err)
    this.renderer.appendChild(this.document.body, script);
    return script;
  }
}
