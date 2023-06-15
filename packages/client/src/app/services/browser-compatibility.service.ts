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

  public checkCompatibility(): string | undefined {
    console.log('platform', this.platform);
    if (this.platform.FIREFOX || this.platform.EDGE) {
      return 'ERRORS.missingApi';
    }
    
    try {
      new webkitSpeechRecognition();
    } catch(e) {
      console.error(e);
      return 'ERRORS.serviceUnavailable';
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      return 'ERRORS.liveTextMissing';
    }
    return undefined;
  }
}
