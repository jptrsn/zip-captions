import { Route } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, data: { name: 'Home' } },
  { path: 'about', component: AboutComponent, data: { name: 'About'}},
  { path: 'settings', component: SettingsComponent, data: { name: 'Settings'} }
];
