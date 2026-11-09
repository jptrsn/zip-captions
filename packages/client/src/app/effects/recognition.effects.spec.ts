import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { merge, Subject } from 'rxjs';
import { RecognitionActions } from '../actions/recogntion.actions';
import { RecognitionService } from '../modules/media/services/recognition.service';
import { TranscriptionService } from '../modules/media/services/transcription.service';
import { StorageService } from '../services/storage.service';
import { ChromeTranslatorService } from '../services/translator/chrome-translator.service';
import { RecognitionEffects } from './recognition.effects';

describe('RecognitionEffects', () => {
  let actions$: Subject<Action>;
  let effects: RecognitionEffects;
  let recognitionService: { pauseRecognition: jest.Mock; resumeRecognition: jest.Mock };

  beforeEach(() => {
    actions$ = new Subject<Action>();
    recognitionService = { pauseRecognition: jest.fn(), resumeRecognition: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        RecognitionEffects,
        provideMockActions(() => actions$),
        { provide: RecognitionService, useValue: recognitionService },
        { provide: TranscriptionService, useValue: {} },
        { provide: StorageService, useValue: {} },
        { provide: ChromeTranslatorService, useValue: {} },
      ]
    });
    effects = TestBed.inject(RecognitionEffects);
  });

  describe('resumeRecognition$', () => {
    it('emits resumeSuccess when the resume goes through, including a quick resume that lands on a pending stop', () => {
      const emitted: Action[] = [];
      effects.resumeRecognition$.subscribe((action) => emitted.push(action));

      actions$.next(RecognitionActions.resume());

      expect(recognitionService.resumeRecognition).toHaveBeenCalledTimes(1);
      expect(emitted).toEqual([RecognitionActions.resumeSuccess()]);
    });

    it('emits an error, then pauseSuccess, when the resume fails, so the state stays paused with the resume button', () => {
      recognitionService.resumeRecognition.mockImplementation(() => { throw new Error('Not allowed'); });
      const emitted: Action[] = [];
      merge(effects.resumeRecognition$, effects.pauseRecognitionOnError$).subscribe((action) => {
        emitted.push(action);
        // the error action goes back through the store, as it does in the app
        if (action.type === RecognitionActions.error.type) actions$.next(action);
      });

      actions$.next(RecognitionActions.resume());

      expect(emitted).toEqual([
        RecognitionActions.error({ error: 'Not allowed' }),
        RecognitionActions.pauseSuccess(),
      ]);
      expect(emitted).not.toContainEqual(RecognitionActions.resumeSuccess());
      expect(recognitionService.pauseRecognition).toHaveBeenCalledTimes(1);
    });

    it('keeps handling resumes after a failed one', () => {
      recognitionService.resumeRecognition.mockImplementationOnce(() => { throw new Error('Not allowed'); });
      const emitted: Action[] = [];
      effects.resumeRecognition$.subscribe((action) => emitted.push(action));

      actions$.next(RecognitionActions.resume());
      actions$.next(RecognitionActions.resume());

      expect(emitted).toEqual([
        RecognitionActions.error({ error: 'Not allowed' }),
        RecognitionActions.resumeSuccess(),
      ]);
    });
  });
});
