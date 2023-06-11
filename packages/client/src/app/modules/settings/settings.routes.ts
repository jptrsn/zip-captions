import { Routes } from '@angular/router'
import { SettingsComponent } from './components/settings/settings.component'
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component'

export const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'cookies', component: CookiePolicyComponent }
]