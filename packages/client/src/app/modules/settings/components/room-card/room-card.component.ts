import { AfterViewInit, Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoom } from '../../../../reducers/user.reducer';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements AfterViewInit {
  @Input({ required: false }) room?: UserRoom;
  @Input({ required: false }) isStatic?: boolean;
  @Input({ required: false }) set showEdit(visible: boolean) {
    this.editMode.set(visible);
  }
  @Output() editClosed: EventEmitter<void> = new EventEmitter<void>();
  
  public roomFormGroup: FormGroup;
  public editMode: WritableSignal<boolean> = signal(false);
  public roomIdsList: WritableSignal<string[] | undefined> = signal(undefined);
  public loading: WritableSignal<boolean> = signal(false);

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
    this.editClosed.next();
  }

  deleteRoom(roomId: string): void {
    if (this.room?.roomId !== roomId) {
      throw new Error('cannot delete room')
    }
    this.userService.deleteUserRoom(roomId).subscribe(() => {
      this.room = undefined;
      this.closeEditMode();
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
          this.roomFormGroup.enable();
          this.closeEditMode();
        },
        error: () => {
          this.loading.set(false);
          this.roomFormGroup.enable();
        }
      })
    } else {
      this.roomFormGroup.markAllAsTouched();
    }
  }

}
