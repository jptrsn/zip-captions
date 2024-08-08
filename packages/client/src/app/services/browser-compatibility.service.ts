import {
  Platform
} from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { AppPlatform, BrowserPlatform } from '../models/app.model';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

@Injectable({
  providedIn: 'root'
})
export class BrowserCompatibilityService {

  constructor(private platform: Platform) { }

  public checkCompatibility(): {platform: AppPlatform, browser: BrowserPlatform, warning?: string, error?: string} {
    const rtn: { platform: AppPlatform, browser: BrowserPlatform, error?: string, warning?: string} = {
      platform: AppPlatform.desktop,
      browser: BrowserPlatform.blink
    };
    if (this.platform.FIREFOX) {
      rtn.platform = AppPlatform.unsupported;
      rtn.browser = BrowserPlatform.firefox;
      rtn.error = 'ERRORS.missingApi';
    } else {
      try {
        new webkitSpeechRecognition();
      } catch(e) {
        console.error(e);
        rtn.error = 'ERRORS.serviceUnavailable';
      }
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      rtn.platform = AppPlatform.mobile;
      rtn.browser = this.platform.ANDROID ? BrowserPlatform.android : BrowserPlatform.safari
    } else {
      if (this.platform.EDGE) {
        rtn.browser = BrowserPlatform.edge;
      } else if (this.platform.TRIDENT) {
        rtn.browser = BrowserPlatform.trident;
      } else if (this.platform.WEBKIT) {
        rtn.browser = BrowserPlatform.webkit;
      } else if (this.platform.SAFARI) {
        rtn.browser = BrowserPlatform.safari;
      }
    }
    return rtn;
  }
}
