import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionRenderComponent } from './recognition-render.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognizedLiveTextComponent } from '../recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../recognized-text/recognized-text.component';

describe('RecognitionRenderComponent', () => {
  let component: RecognitionRenderComponent;
  let fixture: ComponentFixture<RecognitionRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        RecognitionRenderComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
