import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { TimeagoModule } from 'ngx-timeago';
import { SharedUiModule } from 'shared-ui';
import { AuthEffects } from '../../effects/auth.effects';
import { UserEffects } from '../../effects/user.effects';
import { userReducer } from '../../reducers/user.reducer';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { TranscriptsListComponent } from './components/transcripts-list/transcripts-list.component';
import { ViewTranscriptComponent } from './components/view-transcript/view-transcript.component';
import { EditableStringComponent } from '../../standalone/editable-string/editable-string.component';
import { RecognitionEngineSelectComponent } from '../../components/recognition-engine-select/recognition-engine-select.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserProfileComponent,
    TranscriptsListComponent,
    ViewTranscriptComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedUiModule,
    NgIconsModule,
    TimeagoModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({ extend: true }),
    EffectsModule.forFeature([UserEffects, AuthEffects]),
    StoreModule.forFeature('user', userReducer),
    EditableStringComponent,
		RecognitionEngineSelectComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
