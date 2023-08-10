import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveSessionComponent } from './leave-session.component';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../models/app.model';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('LeaveSessionComponent', () => {
  let component: LeaveSessionComponent;
  let fixture: ComponentFixture<LeaveSessionComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [LeaveSessionComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveSessionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<MockStore<AppState>>(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
