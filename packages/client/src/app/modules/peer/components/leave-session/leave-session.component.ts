import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PeerActions } from '../../../../actions/peer.actions';
import { AppState } from '../../../../models/app.model';
import { selectHostOnline, selectIsViewing } from '../../../../selectors/peer.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-leave-session',
  templateUrl: './leave-session.component.html',
  styleUrls: ['./leave-session.component.scss'],
})
export class LeaveSessionComponent {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;
  @Input() set showDialog(open: boolean) {
    if (open) {
      this._openModal()
    }
  }
  @Output() dialogClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  private confirmationRequired: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private router: Router,
              private route: ActivatedRoute) {
    this.confirmationRequired = toSignal(this.store.select(selectHostOnline))
  }

  confirmLeaveBroadcast(): void {
    if (this.confirmationRequired()) {
      this._openModal();
    } else {
      this.leaveBroadcast();
    }
  }

  leaveBroadcast(): void {
    this.store.dispatch(PeerActions.leaveBroadcastRoom());
    this.store.select(selectIsViewing).pipe(
      filter((isViewing) => !isViewing),
      take(1)
    ).subscribe(() => {
      this.dialogClosed.next(true);
    })
    this._closeModal();
    this.router.navigate(['..'], { queryParams: { joinCode: null}, queryParamsHandling: 'merge', relativeTo: this.route});
  }

  hideModal(): void {
    this.dialogClosed.next(false);
    this._closeModal();
  }

  private _openModal(): void {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '')
  }

  private _closeModal(): void {
    this.closeButton.nativeElement.click();
  }
}
