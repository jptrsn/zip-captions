import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { userAuthGuard } from '../../guards/user-auth/user-auth.guard';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate: [ userAuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
