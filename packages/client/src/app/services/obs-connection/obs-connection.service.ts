import { Injectable } from '@angular/core';

import OBSWebSocket from 'obs-websocket-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObsConnectionService {

  private socket: OBSWebSocket;
  constructor() { 
    this.socket = new OBSWebSocket();
  }

  connect({ip, port, password}: {ip: string, port: number, password: string | null}): Observable<any> {
    const url = `ws://${ip}:${port}`;
    const pass: string | undefined = password ? password : undefined;
    console.log('connect', url, pass)
    return from(this.socket.connect(url, pass))
  }

  disconnect(): Observable<void> {
    return from(this.socket.disconnect())
  }

  sendCaption(text: string): Observable<void> {
    return from(this.socket.call<"SendStreamCaption">('SendStreamCaption', {captionText: text}))
  }
  
}
