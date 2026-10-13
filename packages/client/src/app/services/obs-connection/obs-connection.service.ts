import { Injectable, Signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import OBSWebSocket from 'obs-websocket-js';
import { Observable, from, timeout } from 'rxjs';
import { ObsActions } from '../../actions/obs.actions';
import { AppState } from '../../models/app.model';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { selectObsConnected, selectObsStreamActive } from '../../selectors/obs.selectors';

@Injectable({
  providedIn: 'root'
})
export class ObsConnectionService {

  private obs: OBSWebSocket;
  private isStreaming: Signal<boolean | undefined>;
  private connectionState: Signal<ObsConnectionState | undefined>;
  private url?: string;
  private pass?: string;
  constructor(private store: Store<AppState>) { 
    this.obs = new OBSWebSocket();
    this.obs.on('ConnectionClosed', () => this.store.dispatch(ObsActions.disconnectSuccess()))
    this.obs.on('ConnectionError', (err) => this.store.dispatch(ObsActions.errorReceived({error: err.message || 'Unknown Error Occurred'})))
    this.obs.on('Identified', () => this._addObsListeners());
    this.isStreaming = toSignal(this.store.select(selectObsStreamActive));
    this.connectionState = toSignal(this.store.select(selectObsConnected));
  }

  connect({ip, port, password}: {ip: string, port: number, password: string | null}): Observable<any> {
    this.url = `ws://${ip}:${port}`;
    this.pass = password ? password : undefined;
    return from(this.obs.connect(this.url, this.pass)).pipe(timeout(5000))
  }

  disconnect(): Observable<void> {
    this.obs.removeListener('ConnectionClosed');
    this.obs.removeListener('ConnectionError');
    return from(this.obs.disconnect());
  }

  reconnect(): Observable<any> {
    return from(this.obs.connect(this.url, this.pass)).pipe(timeout(5000))
  }

  async sendCaption(captionText: string): Promise<void> {
    // streamingActive isn't reset when the socket closes, so the connection is checked as well
    if (this.isStreaming() && this.connectionState() === ObsConnectionState.connected) {
      try {
        await this.obs.call<"SendStreamCaption">('SendStreamCaption', {captionText});
      } catch (err) {
        console.warn('Could not send caption to OBS', err);
      }
    }
  }

  private _addObsListeners(): void {
    this.obs.call<"GetStreamStatus">('GetStreamStatus').then((status) => {
      this.store.dispatch(ObsActions.setStreamingActive({active: status.outputActive}));
    });
    this.obs.on<"StreamStateChanged">('StreamStateChanged', (status) => {
      this.store.dispatch(ObsActions.setStreamingActive({active: status.outputActive}));
    })
  }
  
}
