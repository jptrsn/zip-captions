import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { PeerEffects } from '../../effects/peer.effects';
import { MediaModule } from '../media/media.module';
import { AcceptPeerConnectionsModalComponent } from './components/accept-peer-connections-modal/accept-peer-connections-modal.component';
import { BroadcastControlsSidebarComponent } from './components/broadcast-controls-sidebar/broadcast-controls-sidebar.component';
import { BroadcastRenderComponent } from './components/broadcast-render/broadcast-render.component';
import { BroadcastRoomComponent } from './components/broadcast-room/broadcast-room.component';
import { ConnectedPeerCountChipComponent } from './components/connected-peer-count-chip/connected-peer-count-chip.component';
import { EndBroadcastComponent } from './components/end-broadcast/end-broadcast.component';
import { JoinCodeComponent } from './components/join-code/join-code.component';
import { LeaveSessionComponent } from './components/leave-session/leave-session.component';
import { PeerLandingComponent } from './components/peer-landing/peer-landing.component';
import { PeerServerStatusChipComponent } from './components/peer-server-status-chip/peer-server-status-chip.component';
import { RoomIdComponent } from './components/room-id/room-id.component';
import { SocketServerStatusChipComponent } from './components/socket-server-status-chip/socket-server-status-chip.component';
import { ViewBroadcastComponent } from './components/view-broadcast/view-broadcast.component';
import { PeerRoutingModule } from './peer-routing.module';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [
    EndBroadcastComponent,
    LeaveSessionComponent,
    PeerLandingComponent,
    SocketServerStatusChipComponent,
    PeerServerStatusChipComponent,
    ViewBroadcastComponent,
    ConnectedPeerCountChipComponent,
    RoomIdComponent,
    JoinCodeComponent,
    BroadcastRoomComponent,
    BroadcastControlsSidebarComponent,
    BroadcastRenderComponent,
    AcceptPeerConnectionsModalComponent,
  ],
  imports: [
    CommonModule,
    PeerRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgIconsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([PeerEffects]),
    MediaModule,
    ClipboardModule,
    TimeagoModule,
  ],
})
export class PeerModule {}
