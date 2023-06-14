import { AfterViewInit, Component, ElementRef, Renderer2, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { AppActions, AppAppearanceState, AppState } from '../../models/app.model';
import { selectAppAppearance } from '../../selectors/app.selector';

@Component({
  selector: 'app-cookie-modal',
  templateUrl: './cookie-modal.component.html',
  styleUrls: ['./cookie-modal.component.scss'],
})
export class CookieModalComponent implements AfterViewInit {
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  @ViewChild('close', { read: ElementRef }) closeButton!: ElementRef;
  public buttonTooltip: string = $localize`Cookies`;
  public accepted: Signal<boolean | undefined>;
  public declinedDate: Signal<number | undefined>;
  constructor(private store: Store<AppState>,
              private renderer: Renderer2) {
    this.accepted = toSignal(this.store.pipe(
      select(selectAppAppearance),
      map((appearance: AppAppearanceState) => appearance.cookiesAccepted)
    ));

    this.declinedDate = toSignal(this.store.pipe(
      select(selectAppAppearance),
      map((appearance: AppAppearanceState) => appearance.cookiesDeclinedTimestamp)
    ));
  }

  ngAfterViewInit(): void {
    if (this.accepted() === false && this.declinedDate() === undefined) {
      this._openModal();
    }
  }

  accept(): void {
    this.store.dispatch(AppActions.acceptCookies());
    this._closeModal();
  }

  decline(): void {
    this.store.dispatch(AppActions.declineCookies());
    this._closeModal();
  }

  private _openModal(): void {
    // this.renderer.addClass(this.modal.nativeElement, 'modal-open')
    this.renderer.setAttribute(this.modal.nativeElement, 'open', '')
  }

  private _closeModal(): void {
    this.closeButton.nativeElement.click();
  }
}
