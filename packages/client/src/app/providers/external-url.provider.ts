import { InjectionToken } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";

export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export const provideExternalUrls = () => {
  return {
    provide: externalUrlProvider,
    useValue: (route: ActivatedRouteSnapshot) => {
      const externalUrl = route.data['externalUrl'] || route.data['url'];
      if (!externalUrl) {
        throw new Error('No external URL provided')
      }
      window.location.replace(externalUrl);
    }
  }
}