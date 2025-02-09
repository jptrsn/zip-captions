import { Component, effect, Input, OnChanges, OnDestroy, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { startWith, Subject, takeUntil } from 'rxjs';
import { InterfaceLanguage, RecognitionDialect, SupportedDialects } from '../../models/settings.model';

@Component({
  selector: 'app-dialect-selector',
  templateUrl: './dialect-selector.component.html',
  styleUrls: ['./dialect-selector.component.scss'],
})
export class DialectSelectorComponent implements OnChanges, OnDestroy {
	@Input() group!: FormGroup;
	@Input() controlName!: string;
	@Input({ required: false }) languageControlName?: string;
	@Input({ required: false }) language?: InterfaceLanguage;

	public availableDialects: WritableSignal<RecognitionDialect[] | undefined> = signal(undefined);
	private dialects = SupportedDialects;
	private hasSubscription = false;
	private onDestroy$: Subject<void> = new Subject<void>();

	constructor() {
		effect(() => {
			const control: AbstractControl | undefined = this.group?.controls[this.controlName];
			const ad = this.availableDialects();
			if (control) {
				if (ad === undefined) {
					if (!control.disabled) {
						control.disable()
					}
				} else if (control.disabled) {
					control.enable();
				}
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['group'] && changes['languageControlName']?.currentValue && !this.hasSubscription) {
			const controlName = changes['languageControlName'].currentValue
			const languageControl = this.group.get(controlName);
			if (languageControl) {
				this.hasSubscription = true;
				languageControl.valueChanges.pipe(
					startWith(languageControl.value),
					takeUntil(this.onDestroy$)
				).subscribe((language) => {
					this.filterDialects(language);
				})
			}
		}
		if (changes['language']?.currentValue) {
			const language = changes['language'].currentValue;
			this.filterDialects(language);
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
	}

	private filterDialects(language: string): void {
		const exp = new RegExp(language);
		const ad = this.dialects.filter((d) => exp.test(d));
		ad.unshift('unspecified');
		this.availableDialects.set(ad);
	}
}
