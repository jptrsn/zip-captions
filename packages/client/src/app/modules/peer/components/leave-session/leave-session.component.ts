import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leave-session',
  templateUrl: './leave-session.component.html',
  styleUrls: ['./leave-session.component.scss'],
})
export class LeaveSessionComponent {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;

  constructor(private renderer: Renderer2,
              private router: Router,
              private route: ActivatedRoute) {}

  confirmLeaveBroadcast(): void {
    this._openModal();
  }

  leaveBroadcast(): void {
    this._closeModal();
    this.router.navigate(['..'], { queryParams: { joinCode: null}, queryParamsHandling: 'merge', relativeTo: this.route})
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
