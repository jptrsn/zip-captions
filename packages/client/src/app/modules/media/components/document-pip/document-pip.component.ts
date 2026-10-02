import { Component, Signal, ViewEncapsulation } from '@angular/core';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';

@Component({
  selector: 'app-document-pip',
  templateUrl: './document-pip.component.html',
  styleUrls: ['./document-pip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentPipComponent {
  public show: boolean;
  public isPip: Signal<boolean>;

  constructor(private svc: DocumentPipService) {
    this.show = this.svc.isSupported;
    this.isPip = this.svc.isPipActive;
  }

  toggle(): void {
    this.svc.toggle();
  }
}
