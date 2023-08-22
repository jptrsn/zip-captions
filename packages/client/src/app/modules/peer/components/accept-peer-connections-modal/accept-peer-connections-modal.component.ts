import { AfterViewInit, Component, ElementRef, Renderer2, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppActions, AppState } from '../../../../models/app.model';
import { peerConnectionsAcceptedSelector } from '../../../../selectors/app.selector';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-accept-peer-connections-modal',
  templateUrl: './accept-peer-connections-modal.component.html',
  styleUrls: ['./accept-peer-connections-modal.component.scss'],
})
export class AcceptPeerConnectionsModalComponent implements AfterViewInit {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  public accepted: Signal<boolean | undefined>;
  public saveSettingControl: FormControl;
  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private router: Router,
              private fb: FormBuilder) {
    this.accepted = toSignal(this.store.select(peerConnectionsAcceptedSelector));
    this.saveSettingControl = this.fb.control<boolean | undefined>(this.accepted());
  }

  ngAfterViewInit(): void {
    if (!this.accepted()) {
      this._openModal();
    }
  }

  accept(): void {
    this.store.dispatch(AppActions.setPeerConnectionsAccepted({accepted: true, save: this.saveSettingControl.value}));
    this._closeModal();
  }

  decline(): void {
    this.store.dispatch(AppActions.setPeerConnectionsAccepted({accepted: false, save: this.saveSettingControl.value}));
    this._closeModal();
    this.router.navigate([''])
  }

  private _openModal(): void {
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '')
  }

  private _closeModal(): void {
    this.renderer.removeAttribute(this.modal.nativeElement, 'open')
  }
}
