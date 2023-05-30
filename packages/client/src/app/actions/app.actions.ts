import { createAction } from "@ngrx/store";

export const setTheme = createAction('[App] Set Theme');
export const showFooter = createAction('[App] Show Footer');
export const hideFooter = createAction('[App] Hide Footer')