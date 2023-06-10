import {
  Platform
} from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BrowserCompatibilityService {

  constructor(private platform: Platform) { }

  public checkCompatibility(): void {
    console.log('platform', this.platform);
  }
}
