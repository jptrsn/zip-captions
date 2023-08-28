import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomIdComponent } from './room-id.component';

describe('RoomIdComponent', () => {
  let component: RoomIdComponent;
  let fixture: ComponentFixture<RoomIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomIdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
