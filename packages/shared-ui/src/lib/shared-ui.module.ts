import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProperPipe } from './pipes/proper.pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProperPipe, 
  ],
  exports: [
    ProperPipe,
  ],
})
export class SharedUiModule {}
