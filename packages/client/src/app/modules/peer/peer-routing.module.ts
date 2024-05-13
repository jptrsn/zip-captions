import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { ViewBroadcastComponent } from './components/view-broadcast/view-broadcast.component';
import { activeStreamGuard } from '../../guards/active-stream/active-stream.guard';
import { PeerHomeComponent } from './components/peer-home/peer-home.component';

const routes: Routes = [
  { path: '', component: PeerHomeComponent, children: [
    { path: '', component: PeerLandingComponent, canDeactivate: [activeStreamGuard] },
    { path: ':id', component: ViewBroadcastComponent, canDeactivate: [activeStreamGuard] }
    ]
  }
  // { path: '', component: PeerLandingComponent, canDeactivate: [activeStreamGuard] },
  // { path: ':id', component: ViewBroadcastComponent, canDeactivate: [activeStreamGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeerRoutingModule { }
