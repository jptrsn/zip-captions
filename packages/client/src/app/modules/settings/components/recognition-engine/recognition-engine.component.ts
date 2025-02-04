import { Component, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState } from '../../../../models/recognition.model';
import { selectRecognitionEngine } from '../../../../selectors/recognition.selector';
import { map, startWith } from 'rxjs';
import { selectUserBalance } from '../../../../selectors/user.selector';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RecognitionActions } from '../../../../actions/recogntion.actions';

@Component({
  selector: 'app-recognition-engine',
  templateUrl: './recognition-engine.component.html',
  styleUrls: ['./recognition-engine.component.scss'],
})
export class RecognitionEngineComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	public balance: Signal<number | undefined>;
	public isLoggedIn: Signal<boolean | undefined>;
	public patreonUrl = 'https://patreon.com/zipcaptions';
	public group: FormGroup<{provider: FormControl<RecognitionEngineState['provider'] | null | undefined>}>;
	public providers: { value: RecognitionEngineState['provider'], paid: boolean }[] = [
		{ value: 'web', paid: false },
		{ value: 'azure', paid: true}
	]
	constructor(private store: Store<AppState>,
							private fb: FormBuilder
	) {
		const provider = toSignal(this.store.pipe(
			select(selectRecognitionEngine),
			map((e) => e?.provider )
		));

		this.group = this.fb.group({
			provider: this.fb.control(provider())
		});

		const formValue = toSignal(this.group.controls['provider'].valueChanges);
		this.provider = computed(() => {
			return formValue() || provider()
		})

		this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
		const balance = toSignal(this.store.select(selectUserBalance));
		this.balance = computed(() => this.isLoggedIn() ? balance() : undefined);
	}

	setProvider(): void {
		this.group.updateValueAndValidity();
		const {provider} = this.group.getRawValue();
		if (provider) {
			if (provider !== 'web' && !this.balance()) {
				this.group.setErrors({'credits': true});
				this.group.markAllAsTouched();
			} else {
			this.store.dispatch(RecognitionActions.setEngine({ engine: provider }))}
		}
	}

}
