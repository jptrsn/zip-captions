import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastRenderComponent } from './broadcast-render.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognizedLiveTextComponent } from '../../../media/components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../../../media/components/recognized-text/recognized-text.component';

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
