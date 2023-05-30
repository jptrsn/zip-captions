import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioInputButtonComponent } from './audio-input-button.component';

describe('AudioInputButtonComponent', () => {
  let component: AudioInputButtonComponent;
  let fixture: ComponentFixture<AudioInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioInputButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AudioInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
