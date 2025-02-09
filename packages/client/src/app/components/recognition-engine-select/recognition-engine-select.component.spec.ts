import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionEngineSelectComponent } from './recognition-engine-select.component';

describe('RecognitionEngineSelectComponent', () => {
  let component: RecognitionEngineSelectComponent;
  let fixture: ComponentFixture<RecognitionEngineSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognitionEngineSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionEngineSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
