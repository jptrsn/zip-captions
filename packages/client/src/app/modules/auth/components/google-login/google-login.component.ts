import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, WritableSignal, signal } from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {

  loaded: WritableSignal<boolean> = signal(false);
  private script!: HTMLScriptElement;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.script = this._loadClientLib();
  }

  onLibLoad(): void {
    console.log('on lib load', google)
    google.accounts.id.initialize({
      client_id: '374403697962-n3m6fa49ojjub0urrid4ojotff4hhdf2.apps.googleusercontent.com',
      callback: this.onSignIn,
      auto_select: true,
      cancel_on_tap_outside: true,
      prompt_parent_id: 'g_signin',
      ux_mode: 'popup',
    })
    this.loaded.set(true);
  }

  prompt(): void {
    google.accounts.id.prompt((notification: any) => {
      console.log('prompt notification', notification);
    });
  }

  onSignIn(googleUser:any): void {
    console.log('onSignIn', googleUser);
  }

  private _loadClientLib(): HTMLScriptElement {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'text/javascript')
    this.renderer.setAttribute(script, 'src', 'https://accounts.google.com/gsi/client');
    script.onload = () => this.onLibLoad();
    this.renderer.appendChild(this.document.body, script);
    return script;
  }
}
