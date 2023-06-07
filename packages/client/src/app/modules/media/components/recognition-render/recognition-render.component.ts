import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation } from 'angular-animations';
import { map } from 'rxjs';
import { AppState } from '../../../../models/app.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';

@Component({
  selector: 'app-recognition-render',
  templateUrl: './recognition-render.component.html',
  styleUrls: ['./recognition-render.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation()
  ]
})
export class RecognitionRenderComponent {
  public isActive: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.isActive = toSignal(this.store.pipe(
      select(recognitionStatusSelector),
      map((status: RecognitionStatus) => status === RecognitionStatus.connected)
      )
    )
  }
}
