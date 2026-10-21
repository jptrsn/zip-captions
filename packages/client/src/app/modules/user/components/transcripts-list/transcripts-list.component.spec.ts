import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { SharedUiModule, Transcript } from 'shared-ui';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectTranscriptDbInitialized } from '../../../../selectors/recognition.selector';
import { selectTranscriptionEnabled } from '../../../../selectors/settings.selector';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { TranscriptsListComponent } from './transcripts-list.component';

const transcript = (id: number, title: string, description?: string): Transcript => ({ id, userIdHash: 'h', title, description, start: new Date('2026-01-01T10:00:00Z') });

describe('TranscriptsListComponent', () => {
  let component: TranscriptsListComponent;
  let fixture: ComponentFixture<TranscriptsListComponent>;
  let service: { listTranscripts: jest.Mock; updateTranscript: jest.Mock; deleteTranscript: jest.Mock };

  const create = (enabled = true, initialized = true) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectTranscriptionEnabled, enabled);
    store.overrideSelector(selectTranscriptDbInitialized, initialized);
    store.overrideSelector(selectUserLoggedIn, true);
    store.refreshState();
    fixture = TestBed.createComponent(TranscriptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    service = {
      listTranscripts: jest.fn(() => of([transcript(1, 'First'), transcript(2, 'Second')])),
      updateTranscript: jest.fn().mockResolvedValue(undefined),
      deleteTranscript: jest.fn().mockResolvedValue(undefined),
    };
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders, { provide: TranscriptionService, useValue: service }],
      imports: [...TestingModuleImports, SharedUiModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TranscriptsListComponent],
    }).compileComponents();
  });

  it('lists the stored transcripts, newest first, once transcription is on and the database is ready', () => {
    create();
    expect(component.transcripts()?.map((t) => t.title)).toEqual(['Second', 'First']);
    expect(fixture.nativeElement.querySelector('[data-testid="zc-transcripts-open-2"]')?.textContent).toContain('Second');
  });

  it('lists nothing while transcription is switched off', () => {
    create(false);
    expect(component.transcripts()).toEqual([]);
  });

  it('does not read the database before it is initialised', () => {
    create(true, false);
    expect(service.listTranscripts).not.toHaveBeenCalled();
  });

  it('fills the edit form from a transcript, and clears it on cancel', () => {
    create();
    component.editTranscript(transcript(5, 'Title', 'Notes'));
    expect(component.formGroup.value).toEqual({ id: 5, title: 'Title', description: 'Notes' });
    component.cancelEditTranscript();
    expect(component.formGroup.value).toEqual({ id: null, title: null, description: null });
  });

  it('saves only the fields that were changed', () => {
    create();
    component.editTranscript(transcript(5, 'Title', 'Notes'));
    component.formGroup.controls['title'].setValue('New title');
    component.formGroup.controls['title'].markAsDirty();
    component.saveAndClose();
    expect(service.updateTranscript).toHaveBeenCalledWith(5, { title: 'New title' });
  });

  it('removes the description when it is cleared', () => {
    create();
    component.editTranscript(transcript(5, 'Title', 'Notes'));
    component.formGroup.controls['description'].setValue('');
    component.formGroup.controls['description'].markAsDirty();
    component.saveAndClose();
    expect(service.updateTranscript).toHaveBeenCalledWith(5, { description: undefined });
  });

  it('does not save without a title', () => {
    create();
    component.editTranscript(transcript(5, 'Title'));
    component.formGroup.controls['title'].setValue('');
    component.saveAndClose();
    expect(service.updateTranscript).not.toHaveBeenCalled();
  });

  it('deletes only after the user picked a transcript to delete', () => {
    create();
    component.deleteTranscript();
    expect(service.deleteTranscript).not.toHaveBeenCalled();
    component.promptDeleteTranscript(transcript(3, 'Gone'));
    component.deleteTranscript();
    expect(service.deleteTranscript).toHaveBeenCalledWith(3);
  });
});
