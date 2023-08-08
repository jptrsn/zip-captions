import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { ViewBroadcastComponent } from './components/view-broadcast/view-broadcast.component';

const routes: Routes = [
  { path: '', component: PeerLandingComponent },
  { path: ':id', component: ViewBroadcastComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeerRoutingModule { }
