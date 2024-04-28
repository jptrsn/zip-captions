import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinBroadcastComponent } from './join-broadcast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeerService } from '../../services/peer.service';
import { of, throwError } from 'rxjs';

describe('JoinBroadcastComponent', () => {
  let component: JoinBroadcastComponent;
  let fixture: ComponentFixture<JoinBroadcastComponent>;
  let peerService: PeerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [JoinBroadcastComponent],
      providers: [
        {
          provide: PeerService,
          useValue: {
            joinRoom: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinBroadcastComponent);
    component = fixture.componentInstance;
    peerService = TestBed.inject(PeerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form inputs', () => {
    component.joinSessionFormGroup.controls['room'].setValue('');
    expect(component.joinSessionFormGroup.valid).toBeFalsy();

    component.joinSessionFormGroup.controls['room'].setValue('12345');
    expect(component.joinSessionFormGroup.valid).toBeTruthy();
  });

  it('should call joinRoom on valid form submission', () => {
    const joinSpy = jest.spyOn(peerService, 'joinRoom').mockReturnValue(of('joined'));
    component.joinSessionFormGroup.controls['room'].setValue('12345');
    component.joinSession();
    expect(joinSpy).toHaveBeenCalledWith({ roomId: '12345' });
  });

  it('should handle errors during room joining', () => {
    const joinSpy = jest.spyOn(peerService, 'joinRoom').mockReturnValue(throwError(() => new Error('Failed to join')));
    component.joinSessionFormGroup.controls['room'].setValue('12345');
    const result = component.joinSession();
    expect(result).toBeFalsy();
  });
});