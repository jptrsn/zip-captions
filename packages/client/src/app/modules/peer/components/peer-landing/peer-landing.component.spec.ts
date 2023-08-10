import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerLandingComponent } from './peer-landing.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { SocketServerStatusChipComponent } from '../socket-server-status-chip/socket-server-status-chip.component';
import { PeerServerStatusChipComponent } from '../peer-server-status-chip/peer-server-status-chip.component';
import { ConnectedPeerCountChipComponent } from '../connected-peer-count-chip/connected-peer-count-chip.component';

describe('PeerLandingComponent', () => {
  let component: PeerLandingComponent;
  let fixture: ComponentFixture<PeerLandingComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        PeerLandingComponent,
        SocketServerStatusChipComponent,
        PeerServerStatusChipComponent,
        ConnectedPeerCountChipComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(PeerLandingComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
