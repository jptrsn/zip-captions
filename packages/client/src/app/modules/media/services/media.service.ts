import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private streamsMap: Map<string, MediaStream> = new Map();
  private volumeAnalyserMap: Map<string, BehaviorSubject<number>> = new Map();
  private context?: AudioContext;

  public getMediaStream(deviceId: string): Observable<string> {
    return from(navigator.mediaDevices.getUserMedia({video: false, audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
      sampleRate: 1600,
      deviceId
    } })).pipe(
      map((stream: MediaStream) => {
        this.streamsMap.set(stream.id, stream);
        this._watchStreamVolume(stream);
        return stream.id;
      })
    )
  }

  public disconnectStream(streamId: string): string {
    const stream: MediaStream | undefined = this.streamsMap.get(streamId);
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      stream.dispatchEvent(new Event('stop_observation'));
      console.log('disconnected', stream);
    }
    this.streamsMap.delete(streamId);
    return streamId;
  }

  public getVolumeForStream(streamId: string): Observable<number> {
    if (!this.volumeAnalyserMap.has(streamId)) {
      throw new Error(`Stream id ${streamId} does not appear to have a volume analyzer`);
    }
    return this.volumeAnalyserMap.get(streamId)!.asObservable();
  }

  private _watchStreamVolume(stream: MediaStream): void {
    if (!this.context) {
      this.context = new AudioContext();
    }
    let level$ = this.volumeAnalyserMap.get(stream.id);
    if (!level$) {
      level$ = new BehaviorSubject<number>(0)
      this.volumeAnalyserMap.set(stream.id, level$);
    }
    const sourceNode: MediaStreamAudioSourceNode = this.context.createMediaStreamSource(stream);
    const analyserNode:  AnalyserNode = this.context.createAnalyser();
    stream.addEventListener('stop_observation', () => {
      sourceNode.disconnect();
      analyserNode.disconnect();
    })
    sourceNode.connect(analyserNode);
    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
        const volLevel: number = Math.round(Math.sqrt(sumSquares / pcmData.length) * 100);
        level$!.next(volLevel);
        if (stream.active) {
          window.requestAnimationFrame(onFrame);
        } else {
          level$!.next(0)
        }
    };
    window.requestAnimationFrame(onFrame);
  }
}
