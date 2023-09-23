import { createAction, props } from "@ngrx/store";
import { AppAppearanceState, AppPlatform, Connectivity } from "../models/app.model";


export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer');
export const checkUserAgent = createAction('[App] Check UserAgent');
export const initAppearance = createAction('[App] Init Appearance');

export const acceptCookies = createAction('[App] Accept Cookies');
export const declineCookies = createAction('[App] Decline Cookies');
export const setCookiePolicyComplete = createAction('[App] Set Cookie Policy Complete');

export const setPeerConnectionsAccepted = createAction('[App] Set Peer Connections Accepted', props<{accepted: boolean, save?: boolean}>());
export const setPeerConnectionsComplete = createAction('[App] Set Peer Connections Complete');

export const applyWakeLock = createAction('[App] Apply WakeLock');
export const applyWakeLockSuccess = createAction('[App] Apply WakeLock Success', props<{isLocked: boolean}>());
export const applyWakeLockFailure = createAction('[App] Apply WakeLock Failure', props<{error: string}>());

export const releaseWakeLock = createAction('[App] Release WakeLock');
export const releaseWakeLockSuccess = createAction('[App] Release WakeLock Success');
export const releaseWakeLockFailure = createAction('[App] Release WakeLock Failure', props<{error: string}>());

export const checkUserAgentComplete = createAction('[App] Check UserAgent Complete', props<{platform: AppPlatform, error?: string, warning?: string}>());
export const clearAppError = createAction('[App] Clear Error')

export const initAppearanceComplete = createAction('[App] Init Appearance Complete', props<{appearance: AppAppearanceState}>());

export const updateConnectivityState = createAction('[App] Update Connectivity State', props<{connectivity: Connectivity }>());

export const updateWindowsOverlayState = createAction('[App] Update Windows Overlay', props<{visible: boolean}>())