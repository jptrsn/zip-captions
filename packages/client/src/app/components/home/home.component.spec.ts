import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { WelcomeSplashComponent } from '../welcome-splash/welcome-splash.component';
import { By } from '@angular/platform-browser';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from '../../models/app.model';
import { Store } from '@ngrx/store';
import { RecognitionActions } from '../../actions/recognition.actions';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { lastValueFrom } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        HomeComponent,
        WelcomeSplashComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the welcome splash screen', () => {
    expect(fixture.debugElement.query(By.css('app-welcome-splash')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('app-recognition-render'))).toBeNull();
  });

  it('should render recognized text when active', waitForAsync(async() => {
    store.dispatch(RecognitionActions.connect({id: 'test'}));
    await lastValueFrom(store.select(recognitionStatusSelector));
    expect(fixture.debugElement.query(By.css('app-recognition-render')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('app-welcome-splash'))).toBeNull();
  }))
});
