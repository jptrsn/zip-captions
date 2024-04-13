import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';
import { Icons, SharedUiModule } from 'shared-ui';
import { SettingsEffects } from '../../effects/settings.effects';
import { UserEffects } from '../../effects/user.effects';
import { SaveToServerDialogComponent } from '../../standalone/save-to-server-dialog/save-to-server-dialog.component';
import { UnsavedChangesDialogComponent } from '../../standalone/unsavedChangesDialog/unsaved-changes-dialog.component';
import { BroadcastSettingsComponent } from './components/broadcast-settings/broadcast-settings.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { FontFamilySelectorComponent } from './components/font-family-selector/font-family-selector.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LineHeightComponent } from './components/line-height/line-height.component';
import { RenderHistoryComponent } from './components/render-history/render-history.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TextSizeComponent } from './components/text-size/text-size.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { UiSettingsComponent } from './components/ui-settings/ui-settings.component';
import { UserSavedSettingsComponent } from './components/user-saved-settings/user-saved-settings.component';
import { WakeLockEnabledComponent } from './components/wake-lock-enabled/wake-lock-enabled.component';
import { routes } from './settings.routes';
import { NgIconsModule } from '@ng-icons/core';
import { ClipboardModule } from 'ngx-clipboard';

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
    UiSettingsComponent,
    UserSavedSettingsComponent,
    BroadcastSettingsComponent,
    RoomCardComponent,
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
    TimeagoModule,
    NgIconsModule.withIcons({
      ...Icons,
    }),
    ClipboardModule,
  ],
})
export class SettingsModule {}
