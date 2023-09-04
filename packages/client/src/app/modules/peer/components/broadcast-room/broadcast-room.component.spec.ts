import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastRoomComponent } from './broadcast-room.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionRenderComponent } from '../../../media/components/recognition-render/recognition-render.component';
import { RecognizedLiveTextComponent } from '../../../media/components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../../../media/components/recognized-text/recognized-text.component';
import { RecognitionControlSidebarComponent } from '../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component';
import { FullScreenComponent } from '../../../media/components/full-screen/full-screen.component';
import { FlowDirectionComponent } from '../../../media/components/flow-direction/flow-direction.component';

describe('BroadcastRoomComponent', () => {
  let component: BroadcastRoomComponent;
  let fixture: ComponentFixture<BroadcastRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        BroadcastRoomComponent,
        RecognitionRenderComponent,
        RecognitionControlSidebarComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent,
        FullScreenComponent,
        FlowDirectionComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
