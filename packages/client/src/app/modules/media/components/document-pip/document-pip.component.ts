import { Component, Signal, ViewEncapsulation } from '@angular/core';
import { DocumentPipService } from '../../../../services/document-pip/document-pip.service';
import { KeyboardShortcutsService } from '../../../../services/keyboard-shortcuts/keyboard-shortcuts.service';

@Component({
  selector: 'app-document-pip',
  templateUrl: './document-pip.component.html',
  styleUrls: ['./document-pip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentPipComponent {
  public show: boolean;
  public isPip: Signal<boolean>;

  constructor(private svc: DocumentPipService,
              private shortcutsService: KeyboardShortcutsService) {
    this.show = this.svc.isSupported;
    this.isPip = this.svc.isPipActive;
  }

  formatShortcut(): string {
    return this.shortcutsService.formatShortcut('togglePip');
  }

  toggle(): void {
    this.svc.toggle();
  }
}
