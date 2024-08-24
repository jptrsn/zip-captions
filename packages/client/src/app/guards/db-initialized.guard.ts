import { CanActivateFn, Router } from '@angular/router';
import { TranscriptionService } from '../modules/media/services/transcription.service';
import { inject } from '@angular/core';

export const dbInitializedGuard: CanActivateFn = (route, state) => {
  const initialized = inject(TranscriptionService).dbIsInitialized();
  if (initialized) {
    return true;
  }
  inject(Router).navigate(['user/transcripts'])
  return false;
};
