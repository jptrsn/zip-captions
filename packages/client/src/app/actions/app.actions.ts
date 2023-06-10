import { createAction, props } from "@ngrx/store";
import { AppAppearanceState, AppTheme } from "../models/app.model";

export const setTheme = createAction('[App] Set Theme', props<{theme: AppTheme}>());
export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer');
export const checkUserAgent = createAction('[App] Check UserAgent');
export const initAppearance = createAction('[App] Init Settings');


export const checkUserAgentComplete = createAction('[App] Check UserAgent Complete');
export const setThemeComplete = createAction('[App] Set Theme Complete');
export const initAppearanceComplete = createAction('[App] Init Settings Complete', props<{appearance: AppAppearanceState}>());