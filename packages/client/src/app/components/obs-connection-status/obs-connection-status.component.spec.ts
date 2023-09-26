import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsConnectionStatusComponent } from './obs-connection-status.component';

describe('ObsConnectionStatusComponent', () => {
  let component: ObsConnectionStatusComponent;
  let fixture: ComponentFixture<ObsConnectionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsConnectionStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsConnectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
