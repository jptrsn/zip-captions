import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private streamsMap: Map<string, MediaStream> = new Map();
  private volumeAnalyserMap: Map<string, WritableSignal<number>> = new Map();
  private context?: AudioContext;

  public getMediaStream(deviceId: string): Observable<string> {
    // console.log('get media stream', deviceId);
    return from(navigator.mediaDevices.getUserMedia({video: false, audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
      channelCount: 1,
      sampleRate: 1600,
      deviceId
    } })).pipe(
      map((stream: MediaStream) => {
        // console.log('got media stream', stream);
        this.streamsMap.set(stream.id, stream);
        this._watchStreamVolume(stream);
        return stream.id;
      }),

    )
  }

  public disconnectStream(streamId: string): string {
    const stream: MediaStream | undefined = this.streamsMap.get(streamId);
    if (stream) {
      stream.dispatchEvent(new Event('stop_observation'));
      stream.getAudioTracks().forEach((track) => {
        // console.log('streamtrack', track);
        track.stop();
      });
      this.streamsMap.delete(streamId);
    }
    return streamId;
  }

	public disconnectAllStreams(): string {
		let rtnId = '';
		for (const [id, stream] of this.streamsMap) {
			stream.dispatchEvent(new Event('stop_observation'));
      stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
			rtnId = id;
		}
		this.streamsMap.clear()
		return rtnId;
	}

  public getVolumeForStream(streamId: string): Signal<number> {
    if (!this.volumeAnalyserMap.has(streamId)) {
      throw new Error(`Stream id does not appear to have a volume analyzer`);
    }
    return this.volumeAnalyserMap.get(streamId) as Signal<number>;
  }

  private _watchStreamVolume(stream: MediaStream): void {
    if (!this.context) {
      this.context = new AudioContext();
    }
    let level = this.volumeAnalyserMap.get(stream.id);
    if (!level) {
      level = signal(0)
      this.volumeAnalyserMap.set(stream.id, level);
    }
    const sourceNode: MediaStreamAudioSourceNode = this.context.createMediaStreamSource(stream);
    const analyserNode:  AnalyserNode = this.context.createAnalyser();
    stream.addEventListener('stop_observation', () => {
      // console.log('stopping observation of stream')
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
        level!.set(volLevel);
        if (stream.active) {
          window.requestAnimationFrame(onFrame);
        } else {
          // console.log('stream is inactive, setting volume to zero')
          level!.set(0)
        }
    };
    window.requestAnimationFrame(onFrame);
  }
}
