import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedUiModule } from 'shared-ui';
import { UserEffects } from '../../effects/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '../../reducers/user.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule, 
    UserRoutingModule,
    SharedUiModule,
    NgIconsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature('user', userReducer)
  ],
})
export class UserModule {}
