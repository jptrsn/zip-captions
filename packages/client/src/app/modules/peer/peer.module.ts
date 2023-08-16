import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { PeerEffects } from '../../effects/peer.effects';
import { MediaModule } from '../media/media.module';
import { BroadcastSessionComponent } from './components/broadcast-session/broadcast-session.component';
import { ConnectedPeerCountChipComponent } from './components/connected-peer-count-chip/connected-peer-count-chip.component';
import { EndBroadcastComponent } from './components/end-broadcast/end-broadcast.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { LeaveSessionComponent } from './components/leave-session/leave-session.component';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { PeerServerStatusChipComponent } from './components/peer-server-status-chip/peer-server-status-chip.component';
import { SocketServerStatusChipComponent } from './components/socket-server-status-chip/socket-server-status-chip.component';
import { ViewBroadcastComponent } from './components/view-broadcast/view-broadcast.component';
import { PeerRoutingModule } from './peer-routing.module';

@NgModule({
  declarations: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
    PeerLandingComponent,
    SocketServerStatusChipComponent,
    PeerServerStatusChipComponent,
    ViewBroadcastComponent,
    ConnectedPeerCountChipComponent,
  ],
  imports: [
    CommonModule,
    PeerRoutingModule,
    RouterModule,
    NgIconsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([PeerEffects]),
    MediaModule,
  ],
  exports: [
    BroadcastSessionComponent,
    JoinSessionComponent,
    EndBroadcastComponent,
    LeaveSessionComponent,
  ],
})
export class PeerModule {}
