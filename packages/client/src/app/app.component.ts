import { Component, ElementRef, Renderer2, Signal, ViewContainerRef, ViewEncapsulation, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppActions, AppState, AppTheme } from './models/app.model';
import { themeSelector } from './selectors/app.selector';

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
              private el: ElementRef) {
    this.theme$ = toSignal(this.store.pipe(select(themeSelector))) as Signal<AppTheme>;
    effect(() => this.renderer.setAttribute(this.el.nativeElement, 'data-theme', this.theme$()));
    this.store.dispatch(AppActions.initAppearance());
  }
}
