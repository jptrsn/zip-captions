import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndBroadcastComponent } from './end-broadcast.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('EndBroadcastComponent', () => {
  let component: EndBroadcastComponent;
  let fixture: ComponentFixture<EndBroadcastComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [EndBroadcastComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(EndBroadcastComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
