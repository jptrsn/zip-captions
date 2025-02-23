import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProperPipe } from './pipes/proper.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe'
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProperPipe,
    DurationPipe,
    HoursMinutesPipe,
  ],
  exports: [
    ProperPipe,
    DurationPipe,
    HoursMinutesPipe,
  ],
})
export class SharedUiModule {}
