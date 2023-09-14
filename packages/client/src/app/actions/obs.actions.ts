import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ObsActions = createActionGroup({
  source: 'Obs',
  events: {
    'Load Obss': emptyProps(),
    'Connect': props<{ip: string, port: number, password: string | null}>(),
    'Connect Success': emptyProps(),
    'Connect Failure': props<{error: string}>(),
    'Disconnect': emptyProps(),
    'Disconnect Success': emptyProps(),
    'Disconnect Failure': props<{error: string}>(),
  }
});
