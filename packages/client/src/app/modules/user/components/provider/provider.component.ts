import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState } from '../../../../models/recognition.model';
import { selectRecognitionEngine } from '../../../../selectors/recognition.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	constructor(private store: Store<AppState>) {
		this.provider = toSignal(this.store.pipe(
					select(selectRecognitionEngine),
					map((e) => e?.provider )
				));
	}
}
