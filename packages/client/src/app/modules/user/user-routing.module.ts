import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { userAuthGuard } from '../../guards/user-auth/user-auth.guard';
import { TranscriptsListComponent } from './components/transcripts-list/transcripts-list.component';
import { ViewTranscriptComponent } from './components/view-transcript/view-transcript.component';
import { dbInitializedGuard } from '../../guards/db-initialized.guard';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate: [ userAuthGuard ], },
  { path: 'transcripts', component: TranscriptsListComponent, canActivate: [ userAuthGuard ] },
  { path: 'transcripts/:id', component: ViewTranscriptComponent, canActivate: [ userAuthGuard, dbInitializedGuard ] }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
