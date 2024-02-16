import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedUiModule } from 'shared-ui';
import { UserEffects } from '../../effects/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '../../reducers/user.reducer';
import { StoreModule } from '@ngrx/store';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSavedSettingsComponent } from './components/user-saved-settings/user-saved-settings.component';
import { AuthEffects } from '../../effects/auth.effects';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserProfileComponent,
    UserSavedSettingsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedUiModule,
    NgIconsModule,
    TimeagoModule,
    ReactiveFormsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([UserEffects, AuthEffects]),
    StoreModule.forFeature('user', userReducer),
  ],
})
export class UserModule {}
