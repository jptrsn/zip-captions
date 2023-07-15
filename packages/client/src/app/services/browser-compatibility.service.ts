import {
  Platform
} from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

@Injectable({
  providedIn: 'root'
})
export class BrowserCompatibilityService {

  constructor(private platform: Platform) { }

  public checkCompatibility(): {warning?: string, error?: string} {
    const rtn: {error?: string, warning?: string} = {};
    console.log('platform', this.platform);
    if (this.platform.FIREFOX || this.platform.EDGE) {
      rtn.error = 'ERRORS.missingApi';
    } else {
      try {
        new webkitSpeechRecognition();
      } catch(e) {
        console.error(e);
        rtn.error = 'ERRORS.serviceUnavailable';
      }
    }

    if (true || this.platform.ANDROID || this.platform.IOS) {
      rtn.warning = 'ERRORS.liveTextMissing';
    }
    return rtn;
  }
}
