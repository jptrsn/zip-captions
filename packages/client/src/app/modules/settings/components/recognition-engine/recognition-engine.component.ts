import { Component, computed, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState } from '../../../../models/recognition.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectRecognitionEngine } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector } from '../../../../selectors/settings.selector';
import { selectUserBalance } from '../../../../selectors/user.selector';
import { DefaultDialects, InterfaceLanguage, RecognitionDialect, SettingsActions } from '../../models/settings.model';

@Component({
  selector: 'app-recognition-engine',
  templateUrl: './recognition-engine.component.html',
  styleUrls: ['./recognition-engine.component.scss'],
})
export class RecognitionEngineComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	public dialect: Signal<RecognitionDialect | undefined>;
	public language: Signal<InterfaceLanguage | undefined>;
	public fallbackDialect: Signal<RecognitionDialect>;
	public balance: Signal<number | undefined>;
	public isLoggedIn: Signal<boolean | undefined>;
	public patreonUrl = 'https://patreon.com/zipcaptions';
	public group: FormGroup<{
		provider: FormControl<RecognitionEngineState['provider'] | null | undefined>,
		dialect: FormControl<RecognitionDialect | null | undefined>,
	}>;
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

		this.dialect = toSignal(this.store.select(dialectSelector));
		this.language = toSignal(this.store.select(languageSelector));

		this.fallbackDialect = computed(() => {
			const l = this.language();
			if (l && DefaultDialects[l]) {
				return DefaultDialects[l];
			}
			return 'en-US'
		})

		this.group = this.fb.group({
			provider: this.fb.control(provider()),
			dialect: this.fb.control(this.dialect()),
		});

		effect(() => {
			const d = this.fallbackDialect()
			const sd = this.dialect();
			if (d !== this.group.value['dialect'] && sd === 'unspecified') {
				this.group.controls['dialect'].setValue(d)
			}
		})

		const formProvider = toSignal(this.group.controls['provider'].valueChanges);
		this.provider = computed(() => {
			return formProvider() || provider()
		})

		this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
		const balance = toSignal(this.store.select(selectUserBalance));
		this.balance = computed(() => this.isLoggedIn() ? balance() : undefined);
	}

	setProvider(): void {
		this.group.updateValueAndValidity();
		const {provider, dialect} = this.group.getRawValue();
		if (provider) {
			if (provider !== 'web' && !this.balance()) {
				this.group.setErrors({'credits': true});
				this.group.markAllAsTouched();
			} else {
			this.store.dispatch(RecognitionActions.setEngine({ engine: provider }))}
		}
		if (dialect && dialect !== this.dialect()) {
			this.store.dispatch(SettingsActions.setDialect({dialect}))
		}
	}

}
