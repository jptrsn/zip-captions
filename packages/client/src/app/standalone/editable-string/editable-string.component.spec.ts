import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableStringComponent } from './editable-string.component';

describe('EditableStringComponent', () => {
  let component: EditableStringComponent;
  let fixture: ComponentFixture<EditableStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableStringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
