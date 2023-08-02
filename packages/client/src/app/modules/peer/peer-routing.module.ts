import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastSessionComponent } from './components/broadcast-session/broadcast-session.component';

const routes: Routes = [
  { path: '', component: BroadcastSessionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeerRoutingModule { }
