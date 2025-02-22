import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeOutOnLeaveAnimation, slideInUpOnEnterAnimation } from 'angular-animations';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionEngineState } from '../../../../models/recognition.model';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectRecognitionEngineProvider } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector } from '../../../../selectors/settings.selector';
import { selectUserBalance } from '../../../../selectors/user.selector';
import { DefaultDialects, InterfaceLanguage, RecognitionDialect, SettingsActions } from '../../models/settings.model';

interface ProviderOption {
  value: string;
  paid: boolean;
  url: string;
  tokensPerMinute: number;
}

@Component({
  selector: 'app-recognition-engine',
  templateUrl: './recognition-engine.component.html',
  styleUrls: ['./recognition-engine.component.scss'],
  animations: [
      slideInUpOnEnterAnimation(),
      fadeOutOnLeaveAnimation()
    ]
})
export class RecognitionEngineComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	public dialect: Signal<RecognitionDialect | undefined>;
	public language: Signal<InterfaceLanguage | undefined>;
	public fallbackDialect: Signal<RecognitionDialect>;
	public balance: Signal<number | undefined>;
	public isLoggedIn: Signal<boolean | undefined>;
	public patreonUrl = 'https://patreon.com/zipcaptions';
  public selectedOption: Signal<ProviderOption | undefined>;
	public group: FormGroup<{
		provider: FormControl<RecognitionEngineState['provider'] | null | undefined>,
		dialect: FormControl<RecognitionDialect | null | undefined>,
	}>;
	public providers: ProviderOption[] = [
		{ value: 'web', paid: false, url: "https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition", tokensPerMinute: 0 },
		{ value: 'azure', paid: true, url: "https://learn.microsoft.com/en-us/javascript/api/overview/azure/microsoft-cognitiveservices-speech-sdk-readme?view=azure-node-latest", tokensPerMinute: 60 }
	]
  public showToast: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string | undefined> = signal(undefined);

  private formProviderToSave: RecognitionEngineState['provider'] | null = null;
	constructor(private store: Store<AppState>,
							private fb: FormBuilder
	) {
		const provider = toSignal(this.store.select(selectRecognitionEngineProvider));

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
		}, { validators: [ (c) => this.validateProviderAndDialect(c) ]});

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

    this.selectedOption = computed(() => {
      const opt = this.provider();
      if (opt) {
        console.log('selected option', opt);
        return this.providers.find((p) => p.value === opt)
      }
      return undefined;
    })

    // Handle state change after saving the form, so as to show success/error message
    effect(() => {
      if (this.formProviderToSave !== null) {
        if (provider() === this.formProviderToSave) {
          this.showToastMessage();
          this.formProviderToSave = null;
        } else {
          console.warn('failed to save form provider?', provider(), this.formProviderToSave)
        }
      }
    }, { allowSignalWrites: true})

		this.isLoggedIn = toSignal(this.store.select(selectUserLoggedIn));
		const balance = toSignal(this.store.select(selectUserBalance));
		this.balance = computed(() => {
      if (this.isLoggedIn()) {
        const so = this.selectedOption();
        const b = balance();
        if (so?.tokensPerMinute && b) {
          return (b/so.tokensPerMinute) * 60000;
        }
      }
      return undefined;
    });

    effect(() => {
      const p = provider();
      if (p && p !== this.group.controls['provider'].value) {
        this.group.controls['provider'].setValue(p, {emitEvent: true})
      }
    }, { allowSignalWrites: true })
	}

  validateProviderAndDialect(control: AbstractControl): ValidationErrors | null {

    const { provider, dialect } = control.getRawValue();

    if (provider !== 'web' && !this.balance()) {
      this.group.setErrors({'credits': true});
    }

    if (provider !== 'web' && dialect === 'unspecified') {
      return {
        dialect: true
      }
    }

    return null;
  }

	setProvider(): void {
		this.group.updateValueAndValidity();
    if (!this.group.valid) {
      console.log('form invalid', this.group.errors);
      this.group.markAllAsTouched();
      return;
    }
		const {provider, dialect} = this.group.getRawValue();
		if (provider) {
      this.formProviderToSave = provider
      this.store.dispatch(RecognitionActions.setEngine({ engine: provider }));
      this.group.markAsPristine();
    }
		if (dialect && dialect !== this.dialect()) {
			this.store.dispatch(SettingsActions.setDialect({dialect}))
		}
	}

  public showToastMessage(err?: string): void {
    this.showToast.set(true);
    this.errorMessage.set(err);
    setTimeout(() => this.showToast.set(false), 1500);
  }

}
