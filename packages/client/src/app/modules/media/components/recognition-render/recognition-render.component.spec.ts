import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionRenderComponent } from './recognition-render.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognizedLiveTextComponent } from '../recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../recognized-text/recognized-text.component';
import { RecognitionControlSidebarComponent } from '../recognition-control-sidebar/recognition-control-sidebar.component';
import { FlowDirectionComponent } from '../flow-direction/flow-direction.component';
import { FullScreenComponent } from '../full-screen/full-screen.component';

describe('RecognitionRenderComponent', () => {
  let component: RecognitionRenderComponent;
  let fixture: ComponentFixture<RecognitionRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        RecognitionRenderComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent,
        RecognitionControlSidebarComponent,
        FlowDirectionComponent,
        FullScreenComponent,
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
