import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketServerStatusChipComponent } from './socket-server-status-chip.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('SocketServerStatusChipComponent', () => {
  let component: SocketServerStatusChipComponent;
  let fixture: ComponentFixture<SocketServerStatusChipComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [SocketServerStatusChipComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(SocketServerStatusChipComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
