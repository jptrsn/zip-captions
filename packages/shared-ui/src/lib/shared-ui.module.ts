import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProperPipe } from './pipes/proper.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    ProperPipe,
  ],
  exports: [
    ProperPipe,
  ],
})
export class SharedUiModule {}
