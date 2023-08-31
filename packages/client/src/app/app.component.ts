import { Component, ElementRef, Renderer2, Signal, ViewEncapsulation, WritableSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate } from '@angular/service-worker';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppActions, AppState } from './models/app.model';
import { AppTheme, AvailableLanguages, Language } from './modules/settings/models/settings.model';
import { languageSelector, themeSelector } from './selectors/settings.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public renderSwUpdateNotice: WritableSignal<boolean> = signal(false);
  public theme$: Signal<AppTheme>;
  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private el: ElementRef,
              private updates: SwUpdate,
              translate: TranslateService) {

    AvailableLanguages.forEach((lang) => translate.reloadLang(lang))
    translate.setDefaultLang('en');

    this.theme$ = toSignal(this.store.select(themeSelector)) as Signal<AppTheme>;
    const languageChanged = toSignal(this.store.pipe(select(languageSelector))) as Signal<Language>;
    effect(() => translate.use(languageChanged()))
    effect(() => this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme$()));
    this.store.dispatch(AppActions.initAppearance());
    this.store.dispatch(AppActions.checkUserAgent());
    this.renderSwUpdateNotice.set(this.updates.isEnabled);
  }
}
