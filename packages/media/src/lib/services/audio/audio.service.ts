import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  public getMediaStream(deviceId = 'default'): Observable<MediaStream> {
    return from(navigator.mediaDevices.getUserMedia({video: false, audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
      sampleRate: 1600,
      deviceId
      } 
    }))
  }
}
