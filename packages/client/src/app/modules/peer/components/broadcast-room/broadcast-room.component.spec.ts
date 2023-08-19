import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastRoomComponent } from './broadcast-room.component';

describe('BroadcastRoomComponent', () => {
  let component: BroadcastRoomComponent;
  let fixture: ComponentFixture<BroadcastRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadcastRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
