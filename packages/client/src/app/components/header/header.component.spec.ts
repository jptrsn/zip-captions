import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { lastValueFrom } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import '../../../testing/matchMedia.mock';
import { AppPlatform, AppState } from '../../models/app.model';
import { RecognitionActions } from '../../actions/recogntion.actions';
import { RecognitionEnableComponent } from '../../modules/media/components/recognition-enable/recognition-enable.component';
import { RecognitionRenderComponent } from '../../modules/media/components/recognition-render/recognition-render.component';
import { defaultAppState } from '../../reducers/app.reducer';
import { platformSelector } from '../../selectors/app.selector';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { HeaderComponent } from './header.component';
import { DetectPwaInstallComponent } from '../detect-pwa-install/detect-pwa-install.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        HeaderComponent,
        RecognitionEnableComponent,
        RecognitionRenderComponent,
        DetectPwaInstallComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update state when recognition is active', waitForAsync(async() => {
    let status = await lastValueFrom(store.select(recognitionStatusSelector));
    expect(status).toBeFalsy();
    store.dispatch(RecognitionActions.connect({id: 'test'}))
    status = await lastValueFrom(store.select(recognitionStatusSelector));
    expect(status).toBeTruthy();
    store.dispatch(RecognitionActions.disconnect({id: 'test'}));
    status = await lastValueFrom(store.select(recognitionStatusSelector));
    expect(status).toBeFalsy();
  }));

  it('should render media capture when on desktop', () => {
    expect(fixture.debugElement.query(By.css('app-audio-input-enable'))).toBeNull();
    expect(fixture.debugElement.query(By.css('app-recognition-enable'))).toBeDefined();
  });

  it('should render speech-only when on mobile', waitForAsync(async() => {
    const mobileState = defaultAppState;
    mobileState.appearance.platform = AppPlatform.mobile;
    store.setState(mobileState);
    fixture.detectChanges();
    const platform = await lastValueFrom(store.select(platformSelector))
    expect(platform).toEqual(AppPlatform.mobile);
    expect(fixture.debugElement.query(By.css('app-audio-input-enable'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('app-recognition-enable'))).toBeNull();
  }));
});
