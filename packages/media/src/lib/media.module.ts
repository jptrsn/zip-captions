import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AudioInputSelectComponent } from './components/audio-input-select/audio-input-select.component';
import { AudioService } from './services/audio/audio.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AudioInputSelectComponent,
  ],
  exports: [
    AudioInputSelectComponent,
  ],
  providers: [AudioService],
})
export class MediaModule {}
