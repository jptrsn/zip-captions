import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { AuthService } from '../../services/auth.service';
import { MicrosoftLoginComponent } from './microsoft-login.component';

describe('MicrosoftLoginComponent', () => {
  let fixture: ComponentFixture<MicrosoftLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders, { provide: AuthService, useValue: { getAzureLoginUrl: () => 'https://api.example/v1/user/azure-login' } }],
      declarations: [MicrosoftLoginComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MicrosoftLoginComponent);
    fixture.detectChanges();
  });

  it('links the sign-in button to the Azure login URL from the auth service', () => {
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('https://api.example/v1/user/azure-login');
    expect(fixture.nativeElement.querySelector('[data-testid="zc-auth-microsoft"]')).toBeTruthy();
  });
});
