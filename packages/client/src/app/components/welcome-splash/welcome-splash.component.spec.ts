import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { selectUserLoggedIn } from '../../selectors/auth.selectors';
import { WelcomeSplashComponent } from './welcome-splash.component';

describe('WelcomeSplashComponent', () => {
  let fixture: ComponentFixture<WelcomeSplashComponent>;

  const create = (loggedIn: boolean) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserLoggedIn, loggedIn);
    store.refreshState();
    fixture = TestBed.createComponent(WelcomeSplashComponent);
    fixture.detectChanges();
  };
  const loginButton = () => fixture.nativeElement.querySelector('[data-testid="zc-home-login"]') as HTMLElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WelcomeSplashComponent],
    }).compileComponents();
  });

  it('offers a login button to a visitor who is not signed in', () => {
    create(false);
    expect(loginButton()).toBeTruthy();
  });

  it('does not offer it to a signed-in user', () => {
    create(true);
    expect(loginButton()).toBeNull();
  });

  it('shows the supporter status and the two welcome paragraphs either way', () => {
    create(true);
    expect(fixture.nativeElement.querySelector('app-supporter-render')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('p').length).toBe(2);
  });
});
