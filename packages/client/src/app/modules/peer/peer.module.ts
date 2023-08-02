import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeerRoutingModule } from './peer-routing.module';
import { BroadcastSessionComponent } from './components/broadcast-session/broadcast-session.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { EndBroadcastComponent } from './components/end-broadcast/end-broadcast.component';
import { LeaveSessionComponent } from './components/leave-session/leave-session.component';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { PeerEffects } from '../../effects/peer.effects';

@NgModule({
  declarations: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
  ],
  imports: [
    CommonModule, 
    PeerRoutingModule,
    TranslateModule.forChild({extend: true}),
    EffectsModule.forFeature([PeerEffects])
  ],
  exports: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
  ],
})
export class PeerModule {}
