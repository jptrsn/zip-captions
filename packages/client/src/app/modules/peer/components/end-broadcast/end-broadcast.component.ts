import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';

@Component({
  selector: 'app-end-broadcast',
  templateUrl: './end-broadcast.component.html',
  styleUrls: ['./end-broadcast.component.scss'],
})
export class EndBroadcastComponent {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2) {}

  confirmEndBroadcast(): void {
    this._openModal();
  }

  endBroadcast(): void {
    console.log('end broadcast');
    this.store.dispatch(PeerActions.endBroadcast());
    this._closeModal();
  }

  hideModal(): void {
    this._closeModal();
  }

  private _openModal(): void {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '')
  }

  private _closeModal(): void {
    this.closeButton.nativeElement.click();
  }
}
