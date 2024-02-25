import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveToServerDialogComponent } from './save-to-server-dialog.component';

describe('SaveToServerDialogComponent', () => {
  let component: SaveToServerDialogComponent;
  let fixture: ComponentFixture<SaveToServerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveToServerDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveToServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
