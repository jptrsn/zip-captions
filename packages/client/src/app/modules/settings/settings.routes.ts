import { Routes } from '@angular/router'
import { SettingsComponent } from './components/settings/settings.component'
import { unsavedChangesGuard } from '../../guards/unsaved-changes/unsaved-changes.guard'

export const routes: Routes = [
  { path: '', component: SettingsComponent, canDeactivate: [ unsavedChangesGuard ] },
]