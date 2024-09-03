import { Component, effect, Inject, signal, Signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Transcript, TranscriptTextSegment } from 'shared-ui';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { filter } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { Store } from '@ngrx/store';
import { languageSelector } from '../../../../selectors/settings.selector';

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
  private language: Signal<string | undefined>;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              @Inject(TranscriptionService) private transcriptionService: TranscriptionService,
              private fb: FormBuilder
  ) {
    this.language = toSignal(this.store.select(languageSelector));
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
          if (this.transcriptGroup.controls['title'].dirty && formValue.title) {
            update.title = formValue.title;
          }
          if (this.transcriptGroup.controls['description'].dirty) {
            update.description = formValue.description || undefined;
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
        this.segmentGroup.reset({});
      })
    }
  }

  download(format: 'txt' | 'srt' | 'vtt'): void {
    let text = '';
    const segments = this.segments();
    const transcript = this.transcript();
    if (transcript && segments) {
      const tStart = new Date(transcript.start!).getTime();
      let idx = 1;
      const type = format === 'vtt' ? 'text/vtt;charset=utf-8' : 'text/plain;charset=utf-8';
      if (format === 'txt') {
        text += `${transcript.title}\r\n`;
        if (transcript.description) {
          text += `\r\n${transcript.description}\r\n`;
        }
        text += `\r\n`;
      } else if (format === 'vtt') {
        text += `${transcript.title}\r\n\r\n`;
      }
      for (const s of segments) {
        const st = this._parseElapsed(tStart, s.start.getTime(), format === 'vtt');
        const en = this._parseElapsed(tStart, s.end.getTime(), format === 'vtt');
        switch (format) {
          case 'txt': {
            text += `${s.text}\r\n`;
            break;
          }
          case 'vtt':
          case 'srt': {
            text += `${idx}\r\n` +
            `${st} --> ${en}\r\n` +
            `${s.text}\r\n\r\n`;
            idx++;
            break;
          }
        }
      }
      const file = new Blob([text], { type });
      const filename = `${transcript.title}.${format}`;
      const el = document.createElement('a');
      el.setAttribute('href', URL.createObjectURL(file));
      el.setAttribute('download', filename);
      el.click();
    }
  }

  private _parseElapsed(initialMs: number, timestampMs: number, vtt?: boolean): string {
    const absDiff = Math.abs(timestampMs - initialMs);
    const ms = absDiff % 1000;
    const seconds = Math.floor(absDiff / 1000) % 60;
    const minutes = Math.floor(absDiff / (1000 * 60)) % 60;
    const hours = Math.floor(absDiff / (1000 * 60 * 60)) % 24;
    return vtt ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}` : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
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
