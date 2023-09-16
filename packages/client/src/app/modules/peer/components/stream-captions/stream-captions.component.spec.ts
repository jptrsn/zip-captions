import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamCaptionsComponent } from './stream-captions.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionControlSidebarComponent } from '../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component';

describe('StreamCaptionsComponent', () => {
  let component: StreamCaptionsComponent;
  let fixture: ComponentFixture<StreamCaptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        StreamCaptionsComponent,
        RecognitionControlSidebarComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(StreamCaptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
