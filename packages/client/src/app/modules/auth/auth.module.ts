import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedUiModule } from 'shared-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    AuthRoutingModule,
    SharedUiModule,
    ReactiveFormsModule,
    TranslateModule.forChild({extend: true}),
  ],
})
export class AuthModule {}
