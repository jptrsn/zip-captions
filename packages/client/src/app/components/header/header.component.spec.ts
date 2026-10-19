import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DocumentPipService } from '../../services/document-pip/document-pip.service';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { lastValueFrom } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import '../../../testing/matchMedia.mock';
import { AppPlatform, AppState } from '../../models/app.model';
import { RecognitionStatus } from '../../models/recognition.model';
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

  it('treats /stream/<code> as a viewer route and hides the recognition buttons there', () => {
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'url', 'get').mockReturnValue('/stream/abc123?tabIndex=1');
    expect(component.isViewerRoute()).toBe(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-recognition-enable'))).toBeNull();
    expect(fixture.debugElement.query(By.css('app-audio-input-enable'))).toBeNull();
  });

  describe('the pop-out button', () => {
    it('is hidden when Picture-in-Picture is unsupported or no caption screen is on view', () => {
      expect(component.showPip()).toBe(false);
      expect(fixture.debugElement.query(By.css('[data-testid="zc-header-pip"]'))).toBeNull();
    });

    it('shows while a caption screen is on view in a supporting browser, and toggles Picture-in-Picture', () => {
      const pip = TestBed.inject(DocumentPipService);
      // isSupported is a plain property read when the header is built, so build it after setting it
      (pip as { isSupported: boolean }).isSupported = true;
      const toggle = jest.spyOn(pip, 'toggle').mockResolvedValue();
      pip.hasElement.set(true);
      store.overrideSelector(recognitionStatusSelector, RecognitionStatus.connected);
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.isActive()).toBe(true);
      const button = fixture.debugElement.query(By.css('[data-testid="zc-header-pip"]'));
      expect(button).not.toBeNull();
      // sized down like the mic button while recognition runs, and the pop-out icon until PiP is open
      expect(button.nativeElement.classList).toContain('btn-xs');
      // dev-mode reflection of the [name] binding
      const iconName = () => button.nativeElement.querySelector('ng-icon').getAttribute('ng-reflect-name');
      expect(iconName()).toBe('heroArrowTopRightOnSquare');
      button.nativeElement.click();
      expect(toggle).toHaveBeenCalled();

      // with the window open the icon is the pop-back-in one, and the button says it is pressed
      pip.isPipActive.set(true);
      fixture.detectChanges();
      expect(iconName()).toBe('heroArrowBottomLeftIntoSquare');
      expect(button.nativeElement.getAttribute('aria-pressed')).toBe('true');
    });
  });

  it('does not treat the start-broadcast route as a viewer route', () => {
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'url', 'get').mockReturnValue('/stream');
    expect(component.isViewerRoute()).toBe(false);
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
