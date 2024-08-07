import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { PatreonLoginComponent } from './patreon-login.component';

describe('PatreonLoginComponent', () => {
  let component: PatreonLoginComponent;
  let fixture: ComponentFixture<PatreonLoginComponent>;
  let authServiceStub: Partial<AuthService>;

  beforeEach(async () => {
    authServiceStub = {
      getPatreonLoginUrl: () => 'http://patreon.com/login'
    };

    await TestBed.configureTestingModule({
      declarations: [PatreonLoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(PatreonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PatreonLoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined authLink', () => {
    expect(component.authLink).toBe('http://patreon.com/login');
  });

  it('should render a link with the correct href', () => {
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.href).toContain('http://patreon.com/login');
  });

  it('should display the correct link text', () => {
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkElement.textContent).toContain('AUTH.loginWithPatreon');
  });
});
