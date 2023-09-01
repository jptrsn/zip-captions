import { Component, Signal, ViewEncapsulation } from '@angular/core';
import { FullScreenService } from '../../../../services/full-screen/full-screen.service';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FullScreenComponent {
  
  public show: boolean;
  public isFullscreen: Signal<boolean>;
  constructor(private svc: FullScreenService) {
    this.show = this.svc.isAvailable;
    this.isFullscreen = this.svc.isFullscreen;
  }

  toggle(): void {
    this.svc.toggle();
  }
}
