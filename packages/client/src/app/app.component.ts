import { Component, ElementRef, Renderer2, Signal, ViewEncapsulation, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppActions, AppState } from './models/app.model';
import { AppTheme, AvailableLanguages, Language } from './modules/settings/models/settings.model';
import { themeSelector } from './selectors/settings.selector';
import { TranslateService } from '@ngx-translate/core'
import { languageSelector } from './selectors/settings.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public theme$: Signal<AppTheme>;
  constructor(private store: Store<AppState>,
              private renderer: Renderer2,
              private el: ElementRef,
              translate: TranslateService) {

    
    AvailableLanguages.forEach((lang) => translate.reloadLang(lang))
    translate.setDefaultLang('en');

    const languageChanged = toSignal(this.store.pipe(select(languageSelector))) as Signal<Language>;
    this.theme$ = toSignal(this.store.pipe(select(themeSelector))) as Signal<AppTheme>;
    effect(() => translate.use(languageChanged()))
    effect(() => this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme$()));
    this.store.dispatch(AppActions.initAppearance());
    this.store.dispatch(AppActions.checkUserAgent());
  }
}
