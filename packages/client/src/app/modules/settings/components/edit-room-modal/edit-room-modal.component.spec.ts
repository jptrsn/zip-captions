import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRoomModalComponent } from './edit-room-modal.component';

describe('EditRoomModalComponent', () => {
  let component: EditRoomModalComponent;
  let fixture: ComponentFixture<EditRoomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRoomModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
