import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { AuthService } from '../../services/auth.service';
import { GoogleOauthLoginComponent } from './google-oauth-login.component';

describe('GoogleOauthLoginComponent', () => {
  let fixture: ComponentFixture<GoogleOauthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders, { provide: AuthService, useValue: { getGoogleLoginUrl: () => 'https://api.example/v1/user/google-login' } }],
      declarations: [GoogleOauthLoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GoogleOauthLoginComponent);
    fixture.detectChanges();
  });

  it('links the sign-in button to the Google login URL from the auth service', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('https://api.example/v1/user/google-login');
    expect(fixture.nativeElement.querySelector('[data-testid="zc-auth-google"]')).toBeTruthy();
  });
});
