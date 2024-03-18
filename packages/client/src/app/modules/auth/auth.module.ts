import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedUiModule } from 'shared-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../../reducers/auth.reducer';
import { NgIconsModule } from '@ng-icons/core';
import { MicrosoftLoginComponent } from './components/microsoft-login/microsoft-login.component';
import { GoogleOauthLoginComponent } from './components/google-oauth-login/google-oauth-login.component';
import { UserEffects } from '../../effects/user.effects';
import { userReducer } from '../../reducers/user.reducer';

@NgModule({
  declarations: [
    LoginComponent,
    MicrosoftLoginComponent,
    GoogleOauthLoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedUiModule,
    NgIconsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('user', userReducer)
  ],
})
export class AuthModule {}
