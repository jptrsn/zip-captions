import { Component, ElementRef, Renderer2, Signal, ViewEncapsulation, WritableSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppActions, AppState, Connectivity } from './models/app.model';
import { AppTheme, AvailableLanguages, Language } from './modules/settings/models/settings.model';
import { languageSelector, themeSelector } from './selectors/settings.selector';
import { isOfflineSelector, windowControlsOverlaySelector } from './selectors/app.selector';

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

    AvailableLanguages.forEach((lang) => this.translate.reloadLang(lang))
    this.translate.setDefaultLang('en');

    this.theme$ = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    const languageChanged = toSignal(this.store.pipe(select(languageSelector))) as Signal<Language>;
    
    effect(() => this.translate.use(languageChanged()))
    effect(() => this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme$()));
    
    this.store.dispatch(AppActions.initAppearance());
    this.store.dispatch(AppActions.checkUserAgent());
    this.renderSwUpdateNotice.set(this.updates.isEnabled);

    this.windowControlsOverlay = toSignal(this.store.select(windowControlsOverlaySelector));
    if ('windowControlsOverlay' in navigator) {
      console.log(navigator.windowControlsOverlay)
      // @ts-expect-error navigator.windowControlsOverlay is of type unknown
      this.store.dispatch(AppActions.updateWindowsOverlayState({visible: navigator.windowControlsOverlay.visible}));
      
      // @ts-expect-error navigator.windowControlsOverlay is of type unknown
      navigator.windowControlsOverlay.addEventListener('geometrychange', (event: { isTrusted: boolean; type: 'geometrychange', visible: boolean}) => {
        console.log('geometry change event', event);
        this.store.dispatch(AppActions.updateWindowsOverlayState({visible: event.visible}));
      })
    }

    // @ts-expect-error PWA specific method
    navigator.getInstalledRelatedApps().then((relatedApps) => {
      console.log('relatedApps', relatedApps);
    }) 
  }

}
