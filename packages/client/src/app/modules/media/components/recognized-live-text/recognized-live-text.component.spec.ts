import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognizedLiveTextComponent } from './recognized-live-text.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('RecognizedLiveTextComponent', () => {
  let component: RecognizedLiveTextComponent;
  let fixture: ComponentFixture<RecognizedLiveTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [RecognizedLiveTextComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizedLiveTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
