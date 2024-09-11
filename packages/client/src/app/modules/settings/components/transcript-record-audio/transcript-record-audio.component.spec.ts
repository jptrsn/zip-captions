import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptRecordAudioComponent } from './transcript-record-audio.component';

describe('TranscriptRecordAudioComponent', () => {
  let component: TranscriptRecordAudioComponent;
  let fixture: ComponentFixture<TranscriptRecordAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptRecordAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscriptRecordAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
