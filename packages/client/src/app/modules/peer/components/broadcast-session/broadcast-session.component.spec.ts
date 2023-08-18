import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastSessionComponent } from './broadcast-session.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { EndBroadcastComponent } from '../end-broadcast/end-broadcast.component';
import { RecognitionRenderComponent } from '../../../media/components/recognition-render/recognition-render.component';
import { RecognizedLiveTextComponent } from '../../../media/components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../../../media/components/recognized-text/recognized-text.component';

describe('BroadcastSessionComponent', () => {
  let component: BroadcastSessionComponent;
  let fixture: ComponentFixture<BroadcastSessionComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingModuleImports],
      declarations: [
        BroadcastSessionComponent,
        EndBroadcastComponent,
        RecognitionRenderComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastSessionComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
