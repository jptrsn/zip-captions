import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { CookiePolicyComponent } from './modules/settings/components/cookie-policy/cookie-policy.component';


export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, data: { name: `home` } },
  { path: 'about', component: AboutComponent, data: { name: `about`}},
  { path: 'privacy', component: PrivacyComponent, data: { name: 'privacy'}},
  { path: 'terms', component: TermsAndConditionsComponent, data: { name: 'terms'}},
  { path: 'cookies', component: CookiePolicyComponent, data: { name: 'cookies'}},
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { name: `settings`} },
  { path: 'stream', loadChildren: () => import('./modules/peer/peer.module').then(m =>m.PeerModule), data: { name: 'stream' }},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), data: { name: 'login' }},
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), data: { name: 'account'}}
];
