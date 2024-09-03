import { Component, computed, Inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { Transcript } from 'shared-ui';
import { AppState } from '../../../../models/app.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectTranscriptDbInitialized } from '../../../../selectors/recognition.selector';
import { selectTranscriptionEnabled } from '../../../../selectors/settings.selector';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transcripts-list',
  templateUrl: './transcripts-list.component.html',
  styleUrls: ['./transcripts-list.component.scss'],
})
export class TranscriptsListComponent {
  enabled: Signal<boolean | undefined>;
  transcripts: Signal<Transcript[] | undefined>;
  loggedIn: Signal<boolean | undefined>;
  editMode: WritableSignal<boolean> = signal(false);
  transcriptToDelete: WritableSignal<Transcript | undefined> = signal(undefined);
  formGroup: FormGroup<{
    id: FormControl<number | null>,
    title: FormControl<string | null>,
    description: FormControl<string | null>
  }>;
  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    @Inject(TranscriptionService) private transcriptionService: TranscriptionService
  ) {
    this.enabled = toSignal(this.store.select(selectTranscriptionEnabled));
    this.loggedIn = toSignal(this.store.select(selectUserLoggedIn));
    this.formGroup = this.fb.group({
      id: this.fb.control<number | null>(null),
      title: this.fb.control<string | null>(null, [Validators.required]),
      description: this.fb.control<string | null>(null)
    })
    const transcriptSignal: Signal<Transcript[] | undefined> = toSignal(
      this.store.select(selectTranscriptDbInitialized)
      .pipe(
        filter((initialized) => (!!initialized)),
        switchMap(() => this.transcriptionService.listTranscripts()),
        map((transcripts) => transcripts.reverse())
        )
      );
    this.transcripts = computed(() => {
      if (this.enabled()) {
        return transcriptSignal();
      }
      return [];
    });
  }

  toggleEditMode(): void {
    this.editMode.set(!this.editMode())
  }

  editTranscript(transcript: Transcript): void {
    this.formGroup.controls['id'].setValue(transcript.id ?? null);
    this.formGroup.controls['title'].setValue(transcript.title || null);
    this.formGroup.controls['description'].setValue(transcript.description || null);
  }

  cancelEditTranscript(): void {
    this.formGroup.reset();
  }

  saveAndClose(): void {
    console.log('save and close');
    this.formGroup.updateValueAndValidity();
    const tId = this.formGroup.controls['id'].value;
    if (this.formGroup.valid && tId !== null) {
      const update: Partial<Transcript> = {};
      const title = this.formGroup.controls['title'].value;
      const description = this.formGroup.controls['description'].value;
      if (this.formGroup.controls['title'].dirty && title) {
        update.title = title;
      }
      if (this.formGroup.controls['description'].dirty) {
        update.description = description || undefined;
      }
      this.transcriptionService.updateTranscript(tId, update).then(() => {
        this.formGroup.markAsPristine();
      })
    }
  }

  promptDeleteTranscript(transcript: Transcript): void {
    this.transcriptToDelete.set(transcript);
  }

  deleteTranscript(): void {
    const t = this.transcriptToDelete();
    if (!t?.id) return
    this.transcriptionService.deleteTranscript(t.id);
  }
}
