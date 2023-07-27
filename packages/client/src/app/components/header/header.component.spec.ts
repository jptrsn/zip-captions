import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { RecognitionEnableComponent } from '../../modules/media/components/recognition-enable/recognition-enable.component';
import { RecognitionRenderComponent } from '../../modules/media/components/recognition-render/recognition-render.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        HeaderComponent,
        RecognitionEnableComponent,
        RecognitionRenderComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
