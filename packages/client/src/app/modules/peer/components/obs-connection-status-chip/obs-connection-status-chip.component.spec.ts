import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsConnectionStatusChipComponent } from './obs-connection-status-chip.component';

describe('ObsConnectionStatusChipComponent', () => {
  let component: ObsConnectionStatusChipComponent;
  let fixture: ComponentFixture<ObsConnectionStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsConnectionStatusChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsConnectionStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
