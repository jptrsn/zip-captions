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
import { UserHomeComponent } from './components/user-home/user-home.component';
import { NgIconsModule } from '@ng-icons/core';
import { MicrosoftLoginComponent } from './components/microsoft-login/microsoft-login.component';
import { GoogleOauthLoginComponent } from './components/google-oauth-login/google-oauth-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserHomeComponent,
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
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthModule {}
