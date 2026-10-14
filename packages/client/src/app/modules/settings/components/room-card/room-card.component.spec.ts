import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeagoModule } from 'ngx-timeago';
import { Subject, from, of, throwError } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { UserRoom } from '../../../../reducers/user.reducer';
import { UserService } from '../../../user/services/user.service';
import { RoomCardComponent } from './room-card.component';

const savedRoom: UserRoom = { roomId: 'ab-1234-5678', isStatic: false, allowAnonymous: true, createdAt: '2026-01-01T00:00:00Z' };

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;
  let userService: Record<string, jest.Mock>;

  const create = async (inputs: Record<string, unknown> = {}) => {
    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    for (const [name, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(name, value);
    }
    fixture.detectChanges();
    // the candidate ids arrive asynchronously, as they do from the server
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    userService = {
      getCandidateRoomIdList: jest.fn(() => from(Promise.resolve(['cd-1111-2222', 'ef-3333-4444']))),
      saveUserRoom: jest.fn((room: Partial<UserRoom>) => of({ ...savedRoom, ...room } as UserRoom)),
      deleteUserRoom: jest.fn(() => of(undefined)),
    };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports, TimeagoModule.forRoot()],
      providers: [...TestingModuleProviders, { provide: UserService, useValue: userService }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RoomCardComponent],
    }).compileComponents();
  });

  describe('a new room', () => {
    it('asks for candidate ids of the right kind and offers the first one', async () => {
      await create({ isStatic: true });
      expect(userService['getCandidateRoomIdList']).toHaveBeenCalledWith(true);
      expect(component.roomIdsList()).toEqual(['cd-1111-2222', 'ef-3333-4444']);
      expect(component.roomFormGroup.value.roomId).toBe('cd-1111-2222');
    });

    it('saves the chosen id as a room of this kind, then closes the editor', async () => {
      await create({ isStatic: true });
      const closed: boolean[] = [];
      component.editClosed.subscribe((v) => closed.push(v));
      component.roomFormGroup.patchValue({ allowAnonymous: true });
      component.saveAndClose();
      expect(userService['saveUserRoom']).toHaveBeenCalledWith({ roomId: 'cd-1111-2222', isStatic: true, allowAnonymous: true });
      expect(component.loading()).toBe(false);
      expect(component.editMode()).toBe(false);
      expect(closed).toEqual([false]);
    });
  });

  describe('an existing room', () => {
    it('shows its settings with the id locked, taking the kind from the room', async () => {
      await create({ room: { ...savedRoom, isStatic: true } });
      expect(component.roomFormGroup.getRawValue()).toEqual({ roomId: 'ab-1234-5678', allowAnonymous: true });
      expect(component.roomFormGroup.controls['roomId'].disabled).toBe(true);
      expect(component.isStatic).toBe(true);
      expect(userService['getCandidateRoomIdList']).not.toHaveBeenCalled();
    });

    it('shows the id in upper case on the card', async () => {
      await create({ room: savedRoom });
      expect(fixture.nativeElement.textContent).toContain('AB-1234-5678');
    });

    it('opens the editor from the edit button or the showEdit input, and closing it reports no change', async () => {
      await create({ room: savedRoom });
      const closed: boolean[] = [];
      component.editClosed.subscribe((v) => closed.push(v));
      component.showEditMode();
      expect(component.editMode()).toBe(true);
      component.closeEditMode();
      expect(component.editMode()).toBe(false);
      expect(closed).toEqual([false]);
      fixture.componentRef.setInput('showEdit', true);
      expect(component.editMode()).toBe(true);
    });

    it('keeps the room\'s id when saving a change to who may join', async () => {
      await create({ room: savedRoom });
      component.roomFormGroup.patchValue({ allowAnonymous: false });
      component.saveAndClose();
      expect(userService['saveUserRoom']).toHaveBeenCalledWith({ roomId: 'ab-1234-5678', isStatic: false, allowAnonymous: false });
    });

    it('is busy and locked while saving, and unlocked again when saving fails, without closing', async () => {
      const pending = new Subject<UserRoom>();
      userService['saveUserRoom'].mockReturnValue(pending);
      await create({ room: savedRoom });
      component.showEditMode();
      component.saveAndClose();
      expect(component.loading()).toBe(true);
      expect(component.roomFormGroup.disabled).toBe(true);
      pending.error(new Error('nope'));
      expect(component.loading()).toBe(false);
      expect(component.roomFormGroup.enabled).toBe(true);
      expect(component.editMode()).toBe(true);
    });

    it('does not save while the form is invalid, and shows the errors', async () => {
      await create({ isStatic: false });
      component.roomFormGroup.controls['roomId'].setValue(null);
      component.saveAndClose();
      expect(userService['saveUserRoom']).not.toHaveBeenCalled();
      expect(component.roomFormGroup.touched).toBe(true);
    });

    it('keeps the room, tells the user, and does not tell the parent to refresh, when deleting fails', async () => {
      userService['deleteUserRoom'].mockReturnValue(throwError(() => new Error('server error')));
      await create({ room: savedRoom });
      component.showEditMode();
      fixture.detectChanges();
      const closed: boolean[] = [];
      component.editClosed.subscribe((v) => closed.push(v));
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(() => component.deleteRoom('ab-1234-5678')).not.toThrow();
      fixture.detectChanges();
      expect(component.room).toBe(savedRoom);
      expect(closed).toEqual([]);
      expect(component.deleteFailed()).toBe(true);
      expect(fixture.nativeElement.querySelector('[data-testid="zc-room-delete-error"]')).toBeTruthy();
      error.mockRestore();
    });

    it('clears the delete error when the next attempt succeeds, and the room is gone', async () => {
      userService['deleteUserRoom'].mockReturnValueOnce(throwError(() => new Error('server error')));
      await create({ room: savedRoom });
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      component.deleteRoom('ab-1234-5678');
      expect(component.deleteFailed()).toBe(true);
      component.deleteRoom('ab-1234-5678');
      expect(component.deleteFailed()).toBe(false);
      expect(component.room).toBeUndefined();
      error.mockRestore();
    });

    it('clears the delete error when the editor is closed', async () => {
      userService['deleteUserRoom'].mockReturnValue(throwError(() => new Error('server error')));
      await create({ room: savedRoom });
      const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      component.deleteRoom('ab-1234-5678');
      component.closeEditMode();
      expect(component.deleteFailed()).toBe(false);
      error.mockRestore();
    });

    it('keeps the room\'s id locked after saving, and after a failed save', async () => {
      await create({ room: savedRoom });
      component.saveAndClose();
      expect(component.roomFormGroup.controls['roomId'].disabled).toBe(true);
      expect(component.roomFormGroup.controls['allowAnonymous'].enabled).toBe(true);
      userService['saveUserRoom'].mockReturnValue(throwError(() => new Error('nope')));
      component.saveAndClose();
      expect(component.roomFormGroup.controls['roomId'].disabled).toBe(true);
    });

    describe('while a delete is in progress', () => {
      const deleteButton = () => fixture.nativeElement.querySelector('button.btn-accent') as HTMLButtonElement | null;
      let pending: Subject<void>;

      beforeEach(async () => {
        pending = new Subject<void>();
        userService['deleteUserRoom'].mockReturnValue(pending);
        await create({ room: savedRoom });
        component.showEditMode();
        fixture.detectChanges();
      });

      it('is busy, and the Delete button is disabled', () => {
        component.deleteRoom('ab-1234-5678');
        fixture.detectChanges();
        expect(component.loading()).toBe(true);
        expect(deleteButton()?.disabled).toBe(true);
      });

      it('sends only one request however many times Delete is triggered', () => {
        component.deleteRoom('ab-1234-5678');
        component.deleteRoom('ab-1234-5678');
        component.deleteRoom('ab-1234-5678');
        expect(userService['deleteUserRoom']).toHaveBeenCalledTimes(1);
      });

      it('is no longer busy once the room is deleted', () => {
        component.deleteRoom('ab-1234-5678');
        pending.next();
        pending.complete();
        expect(component.loading()).toBe(false);
        expect(component.room).toBeUndefined();
      });

      it('is no longer busy when the delete fails, shows the error, and allows another try', () => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        component.deleteRoom('ab-1234-5678');
        pending.error(new Error('server error'));
        expect(component.loading()).toBe(false);
        expect(component.deleteFailed()).toBe(true);
        userService['deleteUserRoom'].mockReturnValue(of(undefined));
        component.deleteRoom('ab-1234-5678');
        expect(userService['deleteUserRoom']).toHaveBeenCalledTimes(2);
        error.mockRestore();
      });
    });

    it('refuses to delete a room other than its own', async () => {
      await create({ room: savedRoom });
      expect(() => component.deleteRoom('zz-0000-0000')).toThrow('cannot delete room');
      expect(userService['deleteUserRoom']).not.toHaveBeenCalled();
    });

    it('deletes its room and tells the parent to refresh', async () => {
      await create({ room: savedRoom });
      const closed: boolean[] = [];
      component.editClosed.subscribe((v) => closed.push(v));
      component.deleteRoom('ab-1234-5678');
      expect(userService['deleteUserRoom']).toHaveBeenCalledWith('ab-1234-5678');
      expect(component.room).toBeUndefined();
      expect(closed).toEqual([true]);
    });
  });

  describe('copy confirmation', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('shows for a moment after copying and can be dismissed early', async () => {
      await create({ room: savedRoom });
      component.copied();
      expect(component.showCopied()).toBe(true);
      jest.advanceTimersByTime(1500);
      expect(component.showCopied()).toBe(false);
      component.copied();
      component.dismissToast();
      expect(component.showCopied()).toBe(false);
    });
  });
});
