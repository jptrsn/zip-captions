import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { BroadcastSessionComponent } from './components/broadcast-session/broadcast-session.component';

const routes: Routes = [
  { path: '', component: PeerLandingComponent },
  { path: ':id', component: BroadcastSessionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeerRoutingModule { }
