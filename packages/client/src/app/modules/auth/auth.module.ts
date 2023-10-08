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

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    AuthRoutingModule,
    SharedUiModule,
    ReactiveFormsModule,
    TranslateModule.forChild({extend: true}),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', authReducer),
  ],
})
export class AuthModule {}
