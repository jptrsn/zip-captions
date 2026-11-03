import { Component, Signal, ViewEncapsulation } from '@angular/core';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';
import { KeyboardShortcutsService } from '../../../../services/keyboard-shortcuts/keyboard-shortcuts.service';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FullScreenComponent {
  
  public show: boolean;
  public isFullscreen: Signal<boolean>;
  constructor(private svc: FullScreenService,
              private shortcutsService: KeyboardShortcutsService) {
    this.show = this.svc.isAvailable;
    this.isFullscreen = this.svc.isFullscreen;
  }

  formatShortcut(): string {
    return this.shortcutsService.formatShortcut('toggleFullscreen');
  }

  toggle(): void {
    this.svc.toggle();
  }
}
