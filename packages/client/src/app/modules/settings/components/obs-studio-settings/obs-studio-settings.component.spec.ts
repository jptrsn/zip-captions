import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsStudioSettingsComponent } from './obs-studio-settings.component';

describe('ObsStudioSettingsComponent', () => {
  let component: ObsStudioSettingsComponent;
  let fixture: ComponentFixture<ObsStudioSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObsStudioSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObsStudioSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
