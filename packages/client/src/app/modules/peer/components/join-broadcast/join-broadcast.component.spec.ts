import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { selectRoomId } from '../../../../selectors/peer.selectors';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { JoinBroadcastComponent } from './join-broadcast.component';

describe('JoinBroadcastComponent', () => {
  let component: JoinBroadcastComponent;
  let fixture: ComponentFixture<JoinBroadcastComponent>;
  let router: Router;
  let navigate: jest.SpyInstance;

  const room = () => component.joinSessionFormGroup.controls['room'];
  const create = (roomId?: string) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectRoomId, roomId as string);
    store.refreshState();
    fixture = TestBed.createComponent(JoinBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      declarations: [JoinBroadcastComponent],
      providers: [...TestingModuleProviders],
    }).compileComponents();
    router = TestBed.inject(Router);
    navigate = jest.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('requires a session id', () => {
    create();
    expect(room().hasError('required')).toBe(true);
  });

  it.each(['4N-A79E-F2GV', '4n-a79e-f2gv'])('accepts the id %s', (id) => {
    create();
    room().setValue(id);
    expect(room().valid).toBe(true);
  });

  it.each(['12345', '4N-A79E', '4N-A79E-F2G!', '4N-A79E-F2GO'])('rejects the id %s', (id) => {
    create();
    room().setValue(id);
    expect(room().hasError('invalid')).toBe(true);
  });

  it('adds the dashes while the id is typed one character at a time', () => {
    create();
    let typed = '';
    for (const char of '4NA79EF2GV') {
      typed = room().value + char;
      room().setValue(typed);
    }
    expect(room().value).toBe('4N-A79E-F2GV');
  });

  it('formats an id set in one go, such as a paste, the same way as one typed', () => {
    create();
    room().setValue('4NA79EF2GV');
    expect(room().value).toBe('4N-A79E-F2GV');
    expect(room().valid).toBe(true);
  });

  it('navigates to the entered id, relative to the current route, when valid', () => {
    create();
    room().setValue('4N-A79E-F2GV');
    expect(component.joinSession()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['4N-A79E-F2GV'], { relativeTo: TestBed.inject(ActivatedRoute) });
  });

  it('does not navigate and marks the field touched when invalid', () => {
    create();
    room().setValue('nope');
    component.joinSession();
    expect(navigate).not.toHaveBeenCalled();
    expect(room().touched).toBe(true);
  });

  it('fills in an id detected from the stream and tells the user for a while', () => {
    jest.useFakeTimers();
    try {
      create('4n-a79e-f2gv');
      expect(room().value).toBe('4N-A79E-F2GV');
      expect(component.showToast()).toBe(true);
      component.dismissToast();
      expect(component.showToast()).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });
});
