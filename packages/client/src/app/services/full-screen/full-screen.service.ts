import { ElementRef, Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService implements OnDestroy {

  public isAvailable: boolean;
  private el?: ElementRef<HTMLElement>;
  public isFullscreen: WritableSignal<boolean>;
  private readonly onFullscreenChange = () => {
    this.isFullscreen.set(document.fullscreenElement !== null);
  };

  constructor() {
    this.isAvailable = document.fullscreenEnabled;
    this.isFullscreen = signal(document.fullscreenElement !== null);
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  registerElement(el: ElementRef): void {
    this.el = el;
    this.el.nativeElement.onfullscreenchange = this.onFullscreenChange;
  }

  deregisterElement(): void {
    if (this.el) {
      this.el.nativeElement.onfullscreenchange = null;
    }
    this.el = undefined;
  }

  toggle(): void {
    if (this.isAvailable) {
      if (this.isFullscreen() || document.fullscreenElement !== null) {
        this._minimize();
      } else {
        this._maximize();
      }
    }
  }

  private _maximize(): void {
    const target = this.el?.nativeElement || document.documentElement;
    target.requestFullscreen?.();
  }

  private _minimize(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }
}
