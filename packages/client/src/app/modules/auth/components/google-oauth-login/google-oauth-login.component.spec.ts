import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleOauthLoginComponent } from './google-oauth-login.component';

describe('GoogleOauthLoginComponent', () => {
  let component: GoogleOauthLoginComponent;
  let fixture: ComponentFixture<GoogleOauthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleOauthLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleOauthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
