import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioInputEnableComponent } from './audio-input-enable.component';

describe('AudioInputEnableComponent', () => {
  let component: AudioInputEnableComponent;
  let fixture: ComponentFixture<AudioInputEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioInputEnableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AudioInputEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
