import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';


export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, data: { name: 'Home' } },
  { path: 'about', component: AboutComponent, data: { name: 'About'}},
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { name: 'Settings'} }
];
