import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBroadcastComponent } from './view-broadcast.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { ActivatedRoute } from '@angular/router';
import { SocketServerStatusChipComponent } from '../socket-server-status-chip/socket-server-status-chip.component';
import { PeerServerStatusChipComponent } from '../peer-server-status-chip/peer-server-status-chip.component';

describe('ViewBroadcastComponent', () => {
  let component: ViewBroadcastComponent;
  let fixture: ComponentFixture<ViewBroadcastComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        ViewBroadcastComponent,
        SocketServerStatusChipComponent,
        PeerServerStatusChipComponent,
      ],
      providers: [
        ...TestingModuleProviders,
        {provide: ActivatedRoute, useValue: { snapshot: { params: { id: 'test-room'}, queryParams: { 'joinCode': 'ABCD'}}}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBroadcastComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
