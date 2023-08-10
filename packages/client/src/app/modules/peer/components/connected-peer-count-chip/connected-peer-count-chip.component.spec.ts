import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedPeerCountChipComponent } from './connected-peer-count-chip.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('ConnectedPeerCountChipComponent', () => {
  let component: ConnectedPeerCountChipComponent;
  let fixture: ComponentFixture<ConnectedPeerCountChipComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [ConnectedPeerCountChipComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedPeerCountChipComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
