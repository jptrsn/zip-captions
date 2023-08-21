import { Component, ElementRef, Renderer2, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions, RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-end-broadcast',
  templateUrl: './end-broadcast.component.html',
  styleUrls: ['./end-broadcast.component.scss'],
})
export class EndBroadcastComponent {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;

  public isActive: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2) {
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
    ))
  }

  confirmEndBroadcast(): void {
    this._openModal();
  }

  endBroadcast(): void {
    this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'broadcast'}));
    this.store.select(recognitionStatusSelector).pipe(
      filter((status) => status === RecognitionStatus.disconnected),
      take(1)
    ).subscribe(() => {
      console.log('recognition ended, ending broadcast');
      this.store.dispatch(PeerActions.endBroadcast());
    })
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
