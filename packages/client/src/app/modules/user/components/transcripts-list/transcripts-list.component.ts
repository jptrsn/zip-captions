import { Component, computed, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';
import { Transcript } from 'shared-ui';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectTranscriptDbInitialized } from '../../../../selectors/recognition.selector';
import { selectTranscriptionEnabled } from '../../../../selectors/settings.selector';
import { TranscriptionService } from '../../../media/services/transcription.service';

@Component({
  selector: 'app-transcripts-list',
  templateUrl: './transcripts-list.component.html',
  styleUrls: ['./transcripts-list.component.scss'],
})
export class TranscriptsListComponent {
  enabled: Signal<boolean | undefined>;
  transcripts: Signal<Transcript[] | undefined>;
  loggedIn: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>,
    @Inject(TranscriptionService) private transcriptionService: TranscriptionService
  ) {
    this.enabled = toSignal(this.store.select(selectTranscriptionEnabled));
    this.loggedIn = toSignal(this.store.select(selectUserLoggedIn));
    const transcriptSignal: Signal<Transcript[] | undefined> = toSignal(
      this.store.select(selectTranscriptDbInitialized)
      .pipe(
        filter((initialized) => (!!initialized)),
        switchMap(() => this.transcriptionService.listTranscripts())
        )
      );
    this.transcripts = computed(() => {
      if (this.enabled()) {
        return transcriptSignal();
      }
      return [];
    });
  }
}
