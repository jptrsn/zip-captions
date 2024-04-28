import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartBroadcastComponent } from './start-broadcast.component';
import { FormsModule } from '@angular/forms';
import { PeerService } from '../../services/peer.service';
import { of } from 'rxjs';

describe('StartBroadcastComponent', () => {
  let component: StartBroadcastComponent;
  let fixture: ComponentFixture<StartBroadcastComponent>;
  let peerService: PeerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [StartBroadcastComponent],
      providers: [
        {
          provide: PeerService,
          useValue: {
            createRoom: jest.fn().mockReturnValue(of('room123'))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StartBroadcastComponent);
    component = fixture.componentInstance;
    peerService = TestBed.inject(PeerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form inputs', () => {
    component.formGroup.controls['room'].setValue('testRoom');
    component.formGroup.controls['useAthentication'].setValue(true);
    fixture.detectChanges();
    component.createRoom();
    expect(peerService.joinRoom).toHaveBeenCalledWith({ roomId: 'testRoom', allowAnonymous: true });
  });

  it('should handle empty room ID', () => {
    component.formGroup.controls['room'].setValue('');
    component.formGroup.controls['useAthentication'].setValue(false);
    fixture.detectChanges();
    component.createRoom();
    expect(peerService.joinRoom).not.toHaveBeenCalled();
  });
});