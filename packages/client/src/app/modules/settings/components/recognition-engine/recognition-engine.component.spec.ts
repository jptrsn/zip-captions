import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionEngineComponent } from './recognition-engine.component';

describe('RecognitionEngineComponent', () => {
  let component: RecognitionEngineComponent;
  let fixture: ComponentFixture<RecognitionEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognitionEngineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
