import { Component, Renderer2, Signal, ViewEncapsulation, WritableSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppActions, AppState } from './models/app.model';
import { AppTheme, AvailableLanguages, InterfaceLanguage, RecognitionDialect, SupportedDialects } from './modules/settings/models/settings.model';
import { windowControlsOverlaySelector } from './selectors/app.selector';
import { languageSelector, selectTranscriptionEnabled, themeSelector } from './selectors/settings.selector';
import { AuthActions } from './actions/auth.actions';
import { selectUserId } from './selectors/user.selector';
import { RecognitionActions } from './actions/recogntion.actions';
import { selectUserLoggedIn } from './selectors/auth.selectors';
import { setDefaultDialect } from './actions/settings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public renderSwUpdateNotice: WritableSignal<boolean> = signal(false);
  public theme$: Signal<AppTheme>;
  public windowControlsOverlay: Signal<boolean | undefined>;

  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private updates: SwUpdate,
              private translate: TranslateService) {

    AvailableLanguages.forEach((lang) => this.translate.reloadLang(lang));

		if ('languages' in navigator) {
			const defaultLanguage = navigator.languages.find((l) => AvailableLanguages.some((al) => al === l));

			if (defaultLanguage) {
				this.translate.setDefaultLang('en');
			} else {
				this.translate.setDefaultLang('en');
			}
			const defaultDialect = navigator.languages.find((l) => SupportedDialects.some((sd) => sd === l)) as RecognitionDialect | undefined;
			if (defaultDialect) {

				this.store.dispatch(setDefaultDialect({dialect: defaultDialect}))
			}
		} else {
			this.translate.setDefaultLang('en');
		}


    this.theme$ = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    const languageChanged = toSignal(this.store.pipe(select(languageSelector))) as Signal<InterfaceLanguage>;
    effect(() => this.translate.use(languageChanged()))
    effect(() => this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme$()));

    this.store.dispatch(AppActions.initAppearance());
    this.store.dispatch(AppActions.checkUserAgent());
    this.store.dispatch(AuthActions.validate());
    this.renderSwUpdateNotice.set(this.updates.isEnabled);

    this.windowControlsOverlay = toSignal(this.store.select(windowControlsOverlaySelector));
    if ('windowControlsOverlay' in navigator) {
      // @ts-expect-error navigator.windowControlsOverlay is of type unknown
      this.store.dispatch(AppActions.updateWindowsOverlayState({visible: navigator.windowControlsOverlay.visible}));

      // @ts-expect-error navigator.windowControlsOverlay is of type unknown
      navigator.windowControlsOverlay.addEventListener('geometrychange', (event: { isTrusted: boolean; type: 'geometrychange', visible: boolean}) => {
        this.store.dispatch(AppActions.updateWindowsOverlayState({visible: event.visible}));
      })
    }

    if ('getInstalledRelatedApps' in navigator) {
      // @ts-expect-error PWA specific method
      navigator.getInstalledRelatedApps().then((relatedApps) => {
        if (relatedApps.length) {
          console.log('relatedApps', relatedApps);
        }
      })
    }

    let transcriptDbInitialized = false;
    const userIdSignal = toSignal(this.store.select(selectUserId));
    const transcriptsEnabledSignal = toSignal(this.store.select(selectTranscriptionEnabled));
    const loggedInSignal = toSignal(this.store.select(selectUserLoggedIn));
    effect(() => {
      const userId = userIdSignal();
      if (userId && transcriptsEnabledSignal() && loggedInSignal()) {
        this.store.dispatch(RecognitionActions.initTranscriptDB({userId}))
        transcriptDbInitialized = true;
      } else if (transcriptDbInitialized) {
        this.store.dispatch(RecognitionActions.deInitTranscriptDB())
      }
    }, { allowSignalWrites: true })
  }

}
