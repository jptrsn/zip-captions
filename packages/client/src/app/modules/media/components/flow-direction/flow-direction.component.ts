import { Component, Signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { selectTextFlow } from '../../../../selectors/settings.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SettingsActions, TextFlow } from '../../../settings/models/settings.model';

@Component({
  selector: 'app-flow-direction',
  templateUrl: './flow-direction.component.html',
  styleUrls: ['./flow-direction.component.scss'],
})
export class FlowDirectionComponent {
  public isFlowDown: Signal<boolean | undefined>;
  constructor(private store: Store<AppState>) {
    this.isFlowDown = toSignal(this.store.pipe(
      select(selectTextFlow), 
      map((flow: TextFlow) => (flow === 'top-down'))));
  }

  toggle(): void {
    const flow: TextFlow = this.isFlowDown() ? 'bottom-up' : 'top-down';
    this.store.dispatch(SettingsActions.setTextFlow({ flow }))
  }
}
