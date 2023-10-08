import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { userAuthGuard } from '../../guards/user-auth/user-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserHomeComponent, canActivate: [userAuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
