import { createAction, props } from "@ngrx/store";
import { AppAppearanceState } from "../models/app.model";


export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer');
export const checkUserAgent = createAction('[App] Check UserAgent');
export const initAppearance = createAction('[App] Init Appearance');


export const checkUserAgentComplete = createAction('[App] Check UserAgent Complete');

export const initAppearanceComplete = createAction('[App] Init Appearance Complete', props<{appearance: AppAppearanceState}>());