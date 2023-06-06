import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, data: { name: 'Home' } },
  { path: 'about', component: AboutComponent, data: { name: 'About'}},
  { path: 'theme', component: ThemeSelectorComponent, data: { name: 'Theme'} }
];
