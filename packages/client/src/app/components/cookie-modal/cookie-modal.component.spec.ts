import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store, select } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { CookieModalComponent } from './cookie-modal.component';
import { AppActions, AppState } from '../../models/app.model';
import { selectAppAppearance } from '../../selectors/app.selector';
import { lastValueFrom, map } from 'rxjs';

describe('CookieModalComponent', () => {
  let component: CookieModalComponent;
  let fixture: ComponentFixture<CookieModalComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [CookieModalComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(CookieModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal on button click', waitForAsync(async() => {
    const cookiesAccepted = store.pipe(select(selectAppAppearance), map((appearance) => appearance.cookiesAccepted));
    component.closeButton.nativeElement.click();
    await lastValueFrom(cookiesAccepted);
    expect(component.modal).toBeUndefined();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.modal).toBeDefined();
  }))

  it('should render modal if not accepted or declined', waitForAsync(async() => {
    const cookiesAccepted = store.pipe(select(selectAppAppearance), map((appearance) => appearance.cookiesAccepted));
    expect(component.modal).toBeDefined();
    const state = await lastValueFrom(cookiesAccepted);
    expect(state).toBeUndefined();
  }));

  it('should hide modal on accept/decline', waitForAsync(async() => {
    const cookiesAccepted = store.pipe(select(selectAppAppearance), map((appearance) => appearance.cookiesAccepted));
    store.dispatch(AppActions.declineCookies());
    let state = await lastValueFrom(cookiesAccepted);
    expect(state).toBeFalsy();
    store.dispatch(AppActions.acceptCookies());
    state = await lastValueFrom(cookiesAccepted);
    expect(state).toBeTruthy();
  }));

});
