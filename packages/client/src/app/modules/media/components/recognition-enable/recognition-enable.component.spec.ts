import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionEnableComponent } from './recognition-enable.component';

describe('RecorderEnableComponent', () => {
  let component: RecognitionEnableComponent;
  let fixture: ComponentFixture<RecognitionEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognitionEnableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
