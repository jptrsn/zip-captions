import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog.component';

describe('UnsavedChangesDialogComponent', () => {
  let component: UnsavedChangesDialogComponent;
  let fixture: ComponentFixture<UnsavedChangesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedChangesDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsavedChangesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
