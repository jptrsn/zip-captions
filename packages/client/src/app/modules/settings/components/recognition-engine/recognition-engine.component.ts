import { Component, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState } from '../../../../models/recognition.model';
import { selectRecognitionEngine } from '../../../../selectors/recognition.selector';
import { map } from 'rxjs';
import { selectUserBalance } from '../../../../selectors/user.selector';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';

@Component({
  selector: 'app-recognition-engine',
  templateUrl: './recognition-engine.component.html',
  styleUrls: ['./recognition-engine.component.scss'],
})
export class RecognitionEngineComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	public balance: Signal<number | undefined>;
	public isLoggedIn: Signal<boolean | undefined>;
	constructor(private store: Store<AppState>) {
		this.provider = toSignal(this.store.pipe(
			select(selectRecognitionEngine),
			map((e) => e?.provider )
		));

		this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
		const balance = toSignal(this.store.select(selectUserBalance));
		this.balance = computed(() => this.isLoggedIn() ? balance() : undefined)

	}
}
