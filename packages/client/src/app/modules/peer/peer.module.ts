import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { PeerEffects } from '../../effects/peer.effects';
import { BroadcastSessionComponent } from './components/broadcast-session/broadcast-session.component';
import { EndBroadcastComponent } from './components/end-broadcast/end-broadcast.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { LeaveSessionComponent } from './components/leave-session/leave-session.component';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { PeerRoutingModule } from './peer-routing.module';
import { SocketServerStatusChipComponent } from './components/socket-server-status-chip/socket-server-status-chip.component';
import { PeerServerStatusChipComponent } from './components/peer-server-status-chip/peer-server-status-chip.component';

@NgModule({
  declarations: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
    PeerLandingComponent,
    SocketServerStatusChipComponent,
    PeerServerStatusChipComponent,
  ],
  imports: [
    CommonModule,
    PeerRoutingModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([PeerEffects]),
  ],
  exports: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
  ],
})
export class PeerModule {}
