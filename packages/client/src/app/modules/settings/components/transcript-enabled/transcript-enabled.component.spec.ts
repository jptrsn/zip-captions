import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranscriptEnabledComponent } from './transcript-enabled.component';

describe('TranscriptEnabledComponent', () => {
  let component: TranscriptEnabledComponent;
  let fixture: ComponentFixture<TranscriptEnabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptEnabledComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscriptEnabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
