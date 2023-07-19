import { createAction, props } from "@ngrx/store";
import { AppAppearanceState, AppPlatform } from "../models/app.model";


export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer');
export const checkUserAgent = createAction('[App] Check UserAgent');
export const initAppearance = createAction('[App] Init Appearance');

export const acceptCookies = createAction('[App] Accept Cookies');
export const declineCookies = createAction('[App] Decline Cookies');
export const setCookiePolicyComplete = createAction('[App] Set Cookie Policy Complete')

export const checkUserAgentComplete = createAction('[App] Check UserAgent Complete', props<{platform: AppPlatform, error?: string, warning?: string}>());

export const initAppearanceComplete = createAction('[App] Init Appearance Complete', props<{appearance: AppAppearanceState}>());