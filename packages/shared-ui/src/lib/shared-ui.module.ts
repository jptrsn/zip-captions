import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProperPipe } from './pipes/proper.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import * as icons from './vectors/vectors';
import { AudioInputButtonComponent } from './components/audio-input-button/audio-input-button.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({
      ...icons,
    }),
  ],
  declarations: [
    ProperPipe, 
    AudioInputButtonComponent,
  ],
  exports: [
    ProperPipe,
    AudioInputButtonComponent,
  ],
})
export class SharedUiModule {}
