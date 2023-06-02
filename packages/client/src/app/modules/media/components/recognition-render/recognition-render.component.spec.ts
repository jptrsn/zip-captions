import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionRenderComponent } from './recognition-render.component';

describe('RecognitionRenderComponent', () => {
  let component: RecognitionRenderComponent;
  let fixture: ComponentFixture<RecognitionRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognitionRenderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
