import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiModule } from 'shared-ui';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { routes } from './settings.routes';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from '../../effects/settings.effects';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { TranslateModule } from '@ngx-translate/core';
import { WakeLockEnabledComponent } from './components/wake-lock-enabled/wake-lock-enabled.component';
import { TextSizeComponent } from './components/text-size/text-size.component';
import { LineHeightComponent } from './components/line-height/line-height.component';
import { UnsavedChangesDialogComponent } from '../../standalone/unsavedChangesDialog/unsaved-changes-dialog.component';
import { RenderHistoryComponent } from './components/render-history/render-history.component';
import { FontFamilySelectorComponent } from './components/font-family-selector/font-family-selector.component';
import { SaveToServerDialogComponent } from '../../standalone/save-to-server-dialog/save-to-server-dialog.component';
import { UserEffects } from '../../effects/user.effects';

@NgModule({
  declarations: [
    SettingsComponent,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    CookiePolicyComponent,
    WakeLockEnabledComponent,
    TextSizeComponent,
    LineHeightComponent,
    RenderHistoryComponent,
    FontFamilySelectorComponent,
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([SettingsEffects, UserEffects]),
    TranslateModule.forChild({ extend: true }),
    UnsavedChangesDialogComponent,
    SaveToServerDialogComponent,
  ],
})
export class SettingsModule {}
