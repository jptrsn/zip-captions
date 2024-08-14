import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProperPipe } from './pipes/proper.pipe';
import { LocalDbService } from './services/local-db/local-db.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProperPipe, 
  ],
  exports: [
    ProperPipe,
    LocalDbService,
  ],
})
export class SharedUiModule {}
