import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionEnableComponent } from './recognition-enable.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('RecorderEnableComponent', () => {
  let component: RecognitionEnableComponent;
  let fixture: ComponentFixture<RecognitionEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [RecognitionEnableComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
