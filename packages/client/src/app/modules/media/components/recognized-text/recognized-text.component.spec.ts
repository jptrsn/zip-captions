import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognizedTextComponent } from './recognized-text.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('RecognizedTextComponent', () => {
  let component: RecognizedTextComponent;
  let fixture: ComponentFixture<RecognizedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [RecognizedTextComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
