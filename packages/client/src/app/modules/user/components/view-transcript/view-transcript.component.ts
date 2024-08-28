import { Component, effect, Inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { Transcript, TranscriptTextSegment } from 'shared-ui';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-transcript',
  templateUrl: './view-transcript.component.html',
  styleUrls: ['./view-transcript.component.scss'],
})
export class ViewTranscriptComponent {
  segments: Signal<TranscriptTextSegment[] | undefined>;
  transcript: Signal<Transcript | undefined>;
  
  transcriptGroup: FormGroup<{
    id: FormControl<number | null>,
    title: FormControl<string | null>,
    description: FormControl<string | null>
  }>;

  segmentGroup: FormGroup<{
    id: FormControl<number | null>,
    text: FormControl<string | null>,
    start: FormControl<string | null>,
    end: FormControl<string | null>
  }>;
  
  private transcriptId: number;
  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              @Inject(TranscriptionService) private transcriptionService: TranscriptionService,
              private fb: FormBuilder
  ) {

    this.transcriptGroup = this.fb.group({
      id: this.fb.control<number | null>(null),
      title: this.fb.control<string | null>(null, {validators: [Validators.required], updateOn: 'blur'}),
      description: this.fb.control<string | null>(null)
    });

    this.segmentGroup = this.fb.group({
      id: this.fb.control<number | null>(null),
      text: this.fb.control<string | null>(null, [Validators.required]),
      start: this.fb.control<string | null>(null),
      end: this.fb.control<string | null>(null)
    });

    this.transcriptGroup.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe((formValue) => {
      if (formValue.id && (formValue.title || formValue.description)) {
        const update: Partial<Transcript> = {}
        const tId = formValue.id;
        if (formValue.title) {
          update.title = formValue.title;
        }
        if (formValue.description) {
          update.description = formValue.description;
        }
        this.transcriptionService.updateTranscript(tId, update);
      }
    })

    this.transcriptId = parseInt(this.route.snapshot.params['id'], 10);
    this.segments = toSignal(this.transcriptionService.listTranscriptSegments(this.transcriptId));
    this.transcript = toSignal(this.transcriptionService.getTranscriptById(this.transcriptId));

    effect(() => {
      const transcript = this.transcript();
      if (transcript) {
        this.transcriptGroup.setValue({
          id: transcript.id || null,
          title: transcript.title || null,
          description: transcript.description || null
        });
      } else {
        this.transcriptGroup.reset({});
      }
      const segments = this.segments();
      if (transcript && segments && transcript.id && !transcript.end && transcript.start) {
        const max =  this._findMaxDate(transcript.start, segments);
        this.transcriptionService.updateTranscript(transcript.id, {end: max})
      }
    })
  }

  private _findMaxDate(initialDate: Date, segments: TranscriptTextSegment[]): Date {
    let max = initialDate;
    for (const s of segments) {
      if (s.end > max) {
        max = s.end;
      }
    }
    return max;
  }
}
