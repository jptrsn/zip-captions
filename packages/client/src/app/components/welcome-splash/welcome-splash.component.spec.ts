import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { WelcomeSplashComponent } from './welcome-splash.component';

describe('WelcomeSplashComponent', () => {
  let component: WelcomeSplashComponent;
  let fixture: ComponentFixture<WelcomeSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports
      ],
      declarations: [
        WelcomeSplashComponent
      ],
      providers: [
        ...TestingModuleProviders
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
