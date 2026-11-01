import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { SupporterProfile } from '../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../selectors/auth.selectors';
import { selectUserSupportProfile } from '../../selectors/user.selector';
import { SupporterRenderComponent } from './supporter-render.component';

const profile = (amountCents: number): SupporterProfile => ({ id: '1', email: 'a@b.c', status: 'active_patron', amountCents });

describe('SupporterRenderComponent', () => {
  let component: SupporterRenderComponent;
  let fixture: ComponentFixture<SupporterRenderComponent>;

  const create = (loggedIn: boolean, supporter?: SupporterProfile) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserLoggedIn, loggedIn);
    store.overrideSelector(selectUserSupportProfile, supporter);
    store.refreshState();
    fixture = TestBed.createComponent(SupporterRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const status = () => ({
    loggedOut: component.loggedOut(),
    active: component.activeSupporter(),
    following: component.following(),
    notFollowing: component.notFollowing(),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [SupporterRenderComponent],
    }).compileComponents();
  });

  it('asks a signed-out visitor to sign in, whatever profile is cached', () => {
    create(false, profile(500));
    expect(status()).toEqual({ loggedOut: true, active: undefined, following: undefined, notFollowing: false });
  });

  it('shows a signed-in user with no Patreon profile as not following', () => {
    create(true, undefined);
    expect(status()).toEqual({ loggedOut: false, active: undefined, following: undefined, notFollowing: true });
  });

  it('shows a paying patron as an active supporter', () => {
    create(true, profile(500));
    expect(status()).toEqual({ loggedOut: false, active: true, following: false, notFollowing: false });
  });

  it('shows a free follower as following, not as an active supporter', () => {
    create(true, profile(0));
    expect(status()).toEqual({ loggedOut: false, active: false, following: true, notFollowing: false });
  });

  it('always links to the Patreon page', () => {
    create(true, undefined);
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('https://patreon.com/zipcaptions');
  });
});
