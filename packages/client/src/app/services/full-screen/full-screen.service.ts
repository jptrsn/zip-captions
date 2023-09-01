import { ElementRef, Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {

  public isAvailable: boolean;
  private el?: ElementRef<HTMLElement>;
  public isFullscreen: WritableSignal<boolean>;
  constructor() {
    this.isAvailable = document.fullscreenEnabled;
    this.isFullscreen = signal(document.fullscreenElement !== null);
  }

  registerElement(el: ElementRef): void {
    this.el = el;
    this.el.nativeElement.onfullscreenchange = () => {
      this.isFullscreen.set(document.fullscreenElement !== null);
    }
  }

  deregisterElement(): void {
    if (this.el) {
      this.el.nativeElement.onfullscreenchange = null;
    }
    this.el = undefined;
  }

  toggle(): void {
    if (!this.el) {
      throw new Error('No element registered for full screen');
    }
    if (this.isAvailable) {
      if (this.isFullscreen()) {
        this._minimize();
      } else {
        this._maximize();
      }
    }
  }

  private _maximize(): void {
    this.el?.nativeElement.requestFullscreen();
  }

  private _minimize(): void {
    document.exitFullscreen();
  }
}
