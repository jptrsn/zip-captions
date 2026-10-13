import { Injectable, Signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs';
import { AppState } from '../../models/app.model';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { selectObsConnected } from '../../selectors/obs.selectors';
import { selectObsFeed } from '../../selectors/settings.selector';
import { CaptionTranslationService } from '../translator/caption-translation.service';
import { ObsConnectionService } from './obs-connection.service';
import { resolveObsCaption } from './obs-caption';

/**
 * The one place OBS stream captions are sent from (FR-P3). It follows the live line of the local
 * recognition feed, as `CaptionTranslationService` sees it, so it works on any page and for both
 * engines, and uses that service's translation instead of running one of its own.
 *
 * Its subscription is created in the constructor (Angular 16: `toObservable` needs an injection context).
 */
@Injectable({
  providedIn: 'root'
})
export class ObsCaptionFeedService {
  /** The text to send now, or null when nothing should be sent */
  public readonly caption: Signal<string | null>;

  constructor(store: Store<AppState>,
              captionTranslation: CaptionTranslationService,
              obs: ObsConnectionService) {
    const connected = toSignal(store.select(selectObsConnected));
    const feed = toSignal(store.select(selectObsFeed), { initialValue: 'original' as const });

    this.caption = computed(() => connected() !== ObsConnectionState.connected ? null : resolveObsCaption({
      feed: feed(),
      live: captionTranslation.liveText(),
      translatedLive: captionTranslation.translatedLive(),
      translating: captionTranslation.active(),
      sourceLanguage: captionTranslation.sourceLanguage(),
      targetLanguage: captionTranslation.target()
    }));

    toObservable(this.caption).pipe(
      filter((text): text is string => text !== null),
      distinctUntilChanged()
    ).subscribe((text) => obs.sendCaption(text));
  }
}
