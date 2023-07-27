import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { CookieModalComponent } from '../cookie-modal/cookie-modal.component';
import { AppActions, AppState } from '../../models/app.model';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { footerVisibleSelector } from '../../selectors/app.selector';
import { lastValueFrom } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        FooterComponent,
        CookieModalComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show show and hide with app state', waitForAsync(async() => {
    expect(component.hidden()).toBeFalsy();
    store.dispatch(AppActions.hideFooter());
    let stateUpdate = await lastValueFrom(store.select(footerVisibleSelector))
    expect(stateUpdate).toBeTruthy();
    expect(component.hidden()).toBeTruthy();
    store.dispatch(AppActions.showFooter());
    stateUpdate = await lastValueFrom(store.select(footerVisibleSelector))
    expect(stateUpdate).toBeFalsy();
    expect(component.hidden()).toBeFalsy();
  }));

});
