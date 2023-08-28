import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerServerStatusChipComponent } from './peer-server-status-chip.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('PeerServerStatusChipComponent', () => {
  let component: PeerServerStatusChipComponent;
  let fixture: ComponentFixture<PeerServerStatusChipComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [PeerServerStatusChipComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(PeerServerStatusChipComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
