import { ElementRef, Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app.model';
import { themeSelector } from '../../selectors/settings.selector';
import { AppTheme } from '../../modules/settings/models/settings.model';

interface DocumentPictureInPictureOptions {
  width?: number;
  height?: number;
  disallowReturnToOpener?: boolean;
}

interface DocumentPictureInPicture extends EventTarget {
  window: Window | null;
  requestWindow(options?: DocumentPictureInPictureOptions): Promise<Window>;
  onenter: ((this: DocumentPictureInPicture, ev: Event) => any) | null;
}

declare global {
  interface Window {
    documentPictureInPicture?: DocumentPictureInPicture;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocumentPipService {
  public readonly isSupported: boolean;
  public readonly isPipActive: WritableSignal<boolean> = signal(false);

  private el?: ElementRef<HTMLElement>;
  private placeholder?: Comment;
  private pipWindow?: Window;
  private theme: Signal<AppTheme | undefined>;

  constructor(private store: Store<AppState>) {
    const hasDocPip = typeof window !== 'undefined' && 'documentPictureInPicture' in window;
    const hasWebSpeech = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    this.isSupported = Boolean(hasDocPip && hasWebSpeech);

    this.theme = toSignal(this.store.select(themeSelector));

    // Keep PiP window theme synced with active store theme
    effect(() => {
      const activeTheme = this.theme();
      if (this.pipWindow && activeTheme) {
        this.pipWindow.document.documentElement.setAttribute('data-theme', activeTheme);
      }
    });
  }

  public registerElement(el: ElementRef<HTMLElement>): void {
    this.el = el;
  }

  public deregisterElement(): void {
    if (this.isPipActive()) {
      this.close();
    }
    this.el = undefined;
  }

  public async toggle(): Promise<void> {
    if (this.isPipActive()) {
      this.close();
    } else {
      await this.open();
    }
  }

  public async open(): Promise<void> {
    if (!this.isSupported) {
      console.warn('Document Picture-in-Picture is not supported in this browser.');
      return;
    }

    if (!this.el?.nativeElement) {
      console.warn('No element registered for Document Picture-in-Picture.');
      return;
    }

    if (this.isPipActive()) {
      return;
    }

    const registeredEl = this.el;

    try {
      const pipWindow = await window.documentPictureInPicture!.requestWindow({
        width: 640,
        height: 320,
      });

      if (!this.el || this.el !== registeredEl || !this.el.nativeElement) {
        pipWindow.close();
        return;
      }

      this.pipWindow = pipWindow;

      // Copy styles to PiP window
      this._copyStyles(pipWindow.document);

      // Apply theme and base document setup
      const activeTheme = this.theme() || document.documentElement.getAttribute('data-theme') || 'Zip-Dark';
      pipWindow.document.documentElement.setAttribute('data-theme', activeTheme);

      pipWindow.document.body.style.margin = '0';
      pipWindow.document.body.style.padding = '0';
      pipWindow.document.body.style.overflow = 'hidden';
      pipWindow.document.body.style.width = '100vw';
      pipWindow.document.body.style.height = '100vh';
      pipWindow.document.body.style.display = 'flex';
      pipWindow.document.body.style.flexDirection = 'column';

      // Insert placeholder in parent DOM
      const targetElement = this.el.nativeElement;
      this.placeholder = document.createComment('document-pip-placeholder');
      if (targetElement.parentNode) {
        targetElement.parentNode.insertBefore(this.placeholder, targetElement);
      }

      // Move element to PiP window body
      pipWindow.document.body.appendChild(targetElement);
      this.isPipActive.set(true);

      // Handle PiP window closing (user clicked 'X' or closed window)
      pipWindow.addEventListener('pagehide', () => {
        this._restoreElement();
        this.isPipActive.set(false);
        this.pipWindow = undefined;
      });
    } catch (err) {
      console.error('Failed to open Document Picture-in-Picture window:', err);
      this._restoreElement();
      this.isPipActive.set(false);
      this.pipWindow = undefined;
    }
  }

  public close(): void {
    if (this.pipWindow) {
      try {
        this.pipWindow.close();
      } catch (e) {
        console.error('Error closing PiP window:', e);
      }
      this.pipWindow = undefined;
    }
    this._restoreElement();
    this.isPipActive.set(false);
  }

  private _restoreElement(): void {
    if (this.el?.nativeElement && this.placeholder?.parentNode) {
      this.placeholder.parentNode.insertBefore(this.el.nativeElement, this.placeholder);
      this.placeholder.remove();
      this.placeholder = undefined;
    }
  }

  private _copyStyles(targetDoc: Document): void {
    // Copy stylesheets from main document
    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
        const style = targetDoc.createElement('style');
        style.textContent = cssRules;
        targetDoc.head.appendChild(style);
      } catch (e) {
        if (styleSheet.href) {
          const link = targetDoc.createElement('link');
          link.rel = 'stylesheet';
          link.type = styleSheet.type || 'text/css';
          link.media = styleSheet.media.mediaText || 'all';
          link.href = styleSheet.href;
          targetDoc.head.appendChild(link);
        }
      }
    });

    // Also clone preconnect links (e.g. fonts)
    document.querySelectorAll('link[rel="preconnect"]').forEach((el) => {
      targetDoc.head.appendChild(el.cloneNode(true));
    });
  }
}
