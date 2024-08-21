import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptionSettingsComponent } from './transcription-settings.component';

describe('TranscriptionSettingsComponent', () => {
  let component: TranscriptionSettingsComponent;
  let fixture: ComponentFixture<TranscriptionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptionSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscriptionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
