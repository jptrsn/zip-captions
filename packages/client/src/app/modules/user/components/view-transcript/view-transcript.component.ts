import { Component, Inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { Transcript, TranscriptTextSegment } from 'shared-ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-transcript',
  templateUrl: './view-transcript.component.html',
  styleUrls: ['./view-transcript.component.scss'],
})
export class ViewTranscriptComponent {
  segments: Signal<TranscriptTextSegment[] | undefined>;
  transcript: Signal<Transcript | undefined>;
  private transcriptId: number;
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              @Inject(TranscriptionService) private transcriptionService: TranscriptionService
  ) {
    this.transcriptId = parseInt(this.route.snapshot.params['id'], 10);
    this.segments = toSignal(this.transcriptionService.listTranscriptSegments(this.transcriptId));
    this.transcript = toSignal(this.transcriptionService.getTranscriptById(this.transcriptId));
  }
}
