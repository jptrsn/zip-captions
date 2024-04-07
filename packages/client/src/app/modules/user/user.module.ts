import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';
import { SharedUiModule } from 'shared-ui';
import { AuthEffects } from '../../effects/auth.effects';
import { UserEffects } from '../../effects/user.effects';
import { userReducer } from '../../reducers/user.reducer';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedUiModule,
    NgIconsModule,
    TimeagoModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([UserEffects, AuthEffects]),
    StoreModule.forFeature('user', userReducer),
  ],
})
export class UserModule {}
