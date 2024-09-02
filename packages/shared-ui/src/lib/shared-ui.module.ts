import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProperPipe } from './pipes/proper.pipe';
import { DurationPipe } from './pipes/duration.pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProperPipe,
    DurationPipe,
  ],
  exports: [
    ProperPipe,
    DurationPipe,
  ],
})
export class SharedUiModule {}
