import { Component, effect, Inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transcript, TranscriptTextSegment } from 'shared-ui';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { filter } from 'rxjs';

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
    // startMs: FormControl<number | null>,
    // endMs: FormControl<number | null>
  }>;
  
  editMode: WritableSignal<boolean>;
  private transcriptId: number;
  constructor(private route: ActivatedRoute,
              @Inject(TranscriptionService) private transcriptionService: TranscriptionService,
              private fb: FormBuilder
  ) {

    this.transcriptGroup = this.fb.group({
      id: this.fb.control<number | null>(null),
      title: this.fb.control<string | null>(null, {validators: [Validators.required], updateOn: 'blur'}),
      description: this.fb.control<string | null>(null, { updateOn: 'blur' })
    });
    this.transcriptGroup.disable();

    this.segmentGroup = this.fb.group({
      id: this.fb.control<number | null>(null, {validators: [Validators.required], updateOn: 'blur'}),
      text: this.fb.control<string | null>(null, {validators: [Validators.required], updateOn: 'blur'}),
      // startMs: this.fb.control<number | null>(null, {validators: [Validators.required], updateOn: 'blur'}),
      // endMs: this.fb.control<number | null>(null, {validators: [Validators.required], updateOn: 'blur'})
    });
    this.segmentGroup.disable();

    this.editMode = signal(false);

    this.transcriptGroup.valueChanges.pipe(
      takeUntilDestroyed(),
      filter(() => this.transcriptGroup.dirty)
    ).subscribe((formValue) => {
      this.transcriptGroup.updateValueAndValidity({emitEvent: false});
      if (this.transcriptGroup.valid) {
        if (formValue.id && (formValue.title || formValue.description)) {
          const update: Partial<Transcript> = {}
          const tId = formValue.id;
          if (formValue.title) {
            update.title = formValue.title;
          }
          if (formValue.description) {
            update.description = formValue.description;
          }
          this.transcriptionService.updateTranscript(tId, update).then(() => {
            this.transcriptGroup.markAsPristine();
          })
        }
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

  toggleEditMode(): void {
    const editable = this.editMode();
    if (!editable) {
      this.transcriptGroup.enable()
      this.segmentGroup.enable();
    } else {
      this.transcriptGroup.disable();
      this.segmentGroup.disable();
    }
    this.editMode.set(!editable);
  }

  editSegment(segment: TranscriptTextSegment, modal: HTMLDialogElement): void {
    if (this.editMode()) {
      this.segmentGroup.setValue({
        id: segment.id || null,
        text: segment.text
      });
      modal.showModal();
    }
  }

  updateTranscriptSegmentText(): void {
    this.segmentGroup.updateValueAndValidity();
    const segmentId = this.segmentGroup.value.id;
    const text = this.segmentGroup.value.text;
    if (this.segmentGroup.valid && segmentId && text) {
      this.transcriptionService.updateTranscriptSegment(segmentId, { text }).then(() => {
        this.toggleEditMode();
      })
    }
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
