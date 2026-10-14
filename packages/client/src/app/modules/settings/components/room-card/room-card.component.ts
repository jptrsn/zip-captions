import { AfterViewInit, Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoom } from '../../../../reducers/user.reducer';
import { UserService } from '../../../user/services/user.service';
import { IClipboardResponse } from 'ngx-clipboard';
import { fadeOutOnLeaveAnimation, slideInUpOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class RoomCardComponent implements AfterViewInit {
  @Input({ required: false }) room?: UserRoom;
  @Input({ required: false }) isStatic?: boolean;
  @Input({ required: false }) set showEdit(visible: boolean) {
    this.editMode.set(visible);
  }
  @Output() editClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public roomFormGroup: FormGroup;
  public editMode: WritableSignal<boolean> = signal(false);
  public showCopied: WritableSignal<boolean> = signal(false);
  public roomIdsList: WritableSignal<string[] | undefined> = signal(undefined);
  public loading: WritableSignal<boolean> = signal(false);
  /** The last attempt to delete the room failed; the room is still there */
  public deleteFailed: WritableSignal<boolean> = signal(false);

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.roomFormGroup = this.fb.group({
      roomId: this.fb.control(this.room?.roomId, [Validators.required]),
      allowAnonymous: this.fb.control<boolean | undefined>(false),
    });
  }

  ngAfterViewInit(): void {
    if (!this.room) {
      this.userService.getCandidateRoomIdList(this.isStatic).subscribe((list) => {
        this.roomIdsList.set(list);
        this.roomFormGroup.controls['roomId'].setValue(list[0]);
      })
    } else {
      this.roomFormGroup.setValue({
        roomId: this.room.roomId,
        allowAnonymous: this.room.allowAnonymous
      });
      this.roomFormGroup.controls['roomId'].disable();
      this.isStatic = this.room.isStatic;
    }
  }

  showEditMode(): void {
    this.editMode.set(true);
  }

  closeEditMode(): void {
    this.editMode.set(false);
    this.deleteFailed.set(false);
    this.editClosed.next(false);
  }

  deleteRoom(roomId: string): void {
    if (this.room?.roomId !== roomId) {
      throw new Error('cannot delete room')
    }
    if (this.loading()) {
      return;
    }
    this.deleteFailed.set(false);
    this.loading.set(true);
    this.userService.deleteUserRoom(roomId).subscribe({
      next: () => {
        this.loading.set(false);
        this.room = undefined;
        this.editClosed.next(true);
      },
      // The room is still there, so leave the card as it is
      error: (err) => {
        console.error('Failed to delete room', err);
        this.loading.set(false);
        this.deleteFailed.set(true);
      }
    })
  }

  saveAndClose(): void {
    this.roomFormGroup.updateValueAndValidity();
    if (this.roomFormGroup.valid) {
      this.loading.set(true);
      this.roomFormGroup.disable();
      this.userService.saveUserRoom({
        roomId: this.roomFormGroup.value.roomId,
        isStatic: this.isStatic,
        allowAnonymous: this.roomFormGroup.value.allowAnonymous
      })
      .subscribe({
        next: (room) => {
          if (this.room) {
            this.room = room;
          }
          this.loading.set(false);
          this._unlockForm();
          this.closeEditMode();
        },
        error: () => {
          this.loading.set(false);
          this._unlockForm();
        }
      })
    } else {
      this.roomFormGroup.markAllAsTouched();
    }
  }

  /** Re-enables the form after saving; the id of an existing room can never be changed */
  private _unlockForm(): void {
    this.roomFormGroup.enable();
    if (this.room) {
      this.roomFormGroup.controls['roomId'].disable();
    }
  }

  copied() {
    this.showCopied.set(true);
    setTimeout(() => this.showCopied.set(false), 1500);
  }

  dismissToast() {
    this.showCopied.set(false);
  }
}
