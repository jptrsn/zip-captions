import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import OBSWebSocket from 'obs-websocket-js';
import { Observable, Subject, from, timeout } from 'rxjs';
import { ObsActions } from '../../actions/obs.actions';
import { AppState } from '../../models/app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectObsStreamActive } from '../../selectors/obs.selectors';

@Injectable({
  providedIn: 'root'
})
export class ObsConnectionService {

  private obs: OBSWebSocket;
  private isStreaming: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) { 
    this.obs = new OBSWebSocket();
    this.obs.on('ConnectionClosed', () => this.store.dispatch(ObsActions.disconnectSuccess()))
    this.obs.on('ConnectionError', (err) => this.store.dispatch(ObsActions.errorReceived({error: err.message || 'Unknown Error Occurred'})))
    this.obs.on('Identified', () => this._addObsListeners());
    this.isStreaming = toSignal(this.store.select(selectObsStreamActive));
  }

  connect({ip, port, password}: {ip: string, port: number, password: string | null}): Observable<any> {
    const url = `ws://${ip}:${port}`;
    const pass: string | undefined = password ? password : undefined;
    return from(this.obs.connect(url, pass)).pipe(timeout(5000))
  }

  disconnect(): Observable<void> {
    this.obs.removeListener('ConnectionClosed');
    this.obs.removeListener('ConnectionError');
    return from(this.obs.disconnect());
  }

  async sendCaption(captionText: string): Promise<void> {
    if (this.isStreaming()) {
      this.obs.call<"SendStreamCaption">('SendStreamCaption', {captionText})
    }
  }

  private _addObsListeners(): void {
    console.log('addListeners', this.obs.identified);
    this.obs.call<"GetStreamStatus">('GetStreamStatus').then((status) => {
      this.store.dispatch(ObsActions.setStreamingActive({active: status.outputActive}));
    });
    this.obs.on<"StreamStateChanged">('StreamStateChanged', (status) => {
      this.store.dispatch(ObsActions.setStreamingActive({active: status.outputActive}));
    })
  }
  
}
