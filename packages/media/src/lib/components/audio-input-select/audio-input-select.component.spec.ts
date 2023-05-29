import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioInputSelectComponent } from './audio-input-select.component';

describe('AudioInputSelectComponent', () => {
  let component: AudioInputSelectComponent;
  let fixture: ComponentFixture<AudioInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioInputSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AudioInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
