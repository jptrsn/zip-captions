import { Component, OnDestroy, Signal, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, distinctUntilChanged, map, pairwise } from 'rxjs';
import { AppState } from '../../models/app.model';
import { dialectSelector, languageSelector, selectTranslationSettings } from '../../selectors/settings.selector';

/**
 * Tells the user that translation was turned off because they changed the spoken language: the pair they chose
 * no longer exists. Watches the settled settings (one tick after the last change), so saving a new spoken
 * language together with translation, which dispatches both, is not reported as a reset.
 */
@Component({
  selector: 'app-translation-reset-notice',
  templateUrl: './translation-reset-notice.component.html',
})
export class TranslationResetNoticeComponent implements OnDestroy {
  private static readonly VISIBLE_MS = 8000;

  public show: WritableSignal<boolean> = signal(false);
  public readonly visible: Signal<boolean> = this.show;
  private hideTimer?: ReturnType<typeof setTimeout>;

  constructor(private store: Store<AppState>) {
    combineLatest([
      this.store.select(languageSelector),
      this.store.select(dialectSelector),
      this.store.select(selectTranslationSettings),
    ]).pipe(
      map(([lang, dialect, translation]) => ({
        spoken: ((dialect && dialect !== 'unspecified' ? dialect : lang) || 'en').split('-')[0].toLowerCase(),
        translating: !!translation?.enabled && (translation?.mode ?? 'off') !== 'off',
      })),
      debounceTime(0),
      distinctUntilChanged((a, b) => a.spoken === b.spoken && a.translating === b.translating),
      pairwise(),
      takeUntilDestroyed(),
    ).subscribe(([before, now]) => {
      if (before.translating && !now.translating && before.spoken !== now.spoken) {
        this.display();
      }
    });
  }

  public dismiss(): void {
    clearTimeout(this.hideTimer);
    this.show.set(false);
  }

  private display(): void {
    clearTimeout(this.hideTimer);
    this.show.set(true);
    this.hideTimer = setTimeout(() => this.show.set(false), TranslationResetNoticeComponent.VISIBLE_MS);
  }

  ngOnDestroy(): void {
    clearTimeout(this.hideTimer);
  }
}
