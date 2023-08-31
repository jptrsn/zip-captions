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

@NgModule({
  declarations: [
    SettingsComponent,
    ThemeSelectorComponent,
    LanguageSelectorComponent,
    CookiePolicyComponent,
    WakeLockEnabledComponent,
    TextSizeComponent,
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([SettingsEffects]),
    TranslateModule.forChild({ extend: true }),
  ],
})
export class SettingsModule {}
