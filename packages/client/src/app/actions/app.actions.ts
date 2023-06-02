import { createAction } from "@ngrx/store";

export const setTheme = createAction('[App] Set Theme');
export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer')
export const checkUserAgent = createAction('[App] Check UserAgent');
export const checkUserAgentComplete = createAction('[App] Check UserAgent Complete')