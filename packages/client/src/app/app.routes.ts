import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, data: { name: `home` } },
  { path: 'about', component: AboutComponent, data: { name: `about`}},
  { path: 'privacy', component: PrivacyComponent, data: { name: 'privacy'}},
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { name: `settings`} }
];
