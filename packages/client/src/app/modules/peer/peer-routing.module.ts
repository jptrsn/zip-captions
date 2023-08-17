import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { ViewBroadcastComponent } from './components/view-broadcast/view-broadcast.component';
import { activeStreamGuard } from '../../guards/active-stream/active-stream.guard';

const routes: Routes = [
  { path: '', component: PeerLandingComponent, canDeactivate: [activeStreamGuard] },
  { path: ':id', component: ViewBroadcastComponent, canDeactivate: [activeStreamGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeerRoutingModule { }
