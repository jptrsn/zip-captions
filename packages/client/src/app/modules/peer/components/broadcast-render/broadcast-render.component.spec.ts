import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastRenderComponent } from './broadcast-render.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognizedLiveTextComponent } from '../../../media/components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../../../media/components/recognized-text/recognized-text.component';
import { RecognitionControlSidebarComponent } from '../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component';
import { FlowDirectionComponent } from '../../../media/components/flow-direction/flow-direction.component';
import { FullScreenComponent } from '../../../media/components/full-screen/full-screen.component';

describe('BroadcastRenderComponent', () => {
  let component: BroadcastRenderComponent;
  let fixture: ComponentFixture<BroadcastRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        BroadcastRenderComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent,
        RecognitionControlSidebarComponent,
        FlowDirectionComponent,
        FullScreenComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
