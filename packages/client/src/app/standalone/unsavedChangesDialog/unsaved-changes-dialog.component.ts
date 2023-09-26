import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-unsaved-changes-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.scss'],
})
export class UnsavedChangesDialogComponent {
  @ViewChild('unsavedChangesModal', {read: ElementRef}) modal!: ElementRef<HTMLElement>;
  @Input() set openModal(value: boolean | undefined) {
    console.log('setOpenModal', value);
    if (value && !this.modalOpen()) {
      this.modalOpen.set(true);
    } else if (value === false && this.modalOpen()) {
      this.modalOpen.set(false);
    }
  }
  @Output() afterClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  public modalOpen: WritableSignal<boolean>;
  constructor(private renderer: Renderer2) {
    this.modalOpen = signal(false);

    effect(() => {
      console.log('effect', this.modal, this.modalOpen())
      if (!this.modal) return;
      if (this.modalOpen()) {
        console.log('open modal');
        this.renderer.addClass(this.modal.nativeElement, 'modal-open')
      } else {
        console.log('close modal');
        this.renderer.removeClass(this.modal.nativeElement, 'modal-open')
      }
    })
  }

  accept(): void {
    this.modalOpen.set(false);
    this.afterClosed.emit(true);
  }

  decline(): void {
    this.modalOpen.set(false);
    this.afterClosed.emit(false);
  }
}
