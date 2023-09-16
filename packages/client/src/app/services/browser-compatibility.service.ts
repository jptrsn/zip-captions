import {
  Platform
} from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { AppPlatform } from '../models/app.model';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare const webkitSpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

@Injectable({
  providedIn: 'root'
})
export class BrowserCompatibilityService {

  constructor(private platform: Platform) { }

  public checkCompatibility(): {platform: AppPlatform, warning?: string, error?: string} {
    const rtn: { platform: AppPlatform, error?: string, warning?: string} = {
      platform: AppPlatform.desktop
    };
    if (this.platform.FIREFOX || this.platform.EDGE) {
      rtn.platform = AppPlatform.unsupported;
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
      rtn.warning = 'ERRORS.liveTextMissing';
    }
    return rtn;
  }
}
