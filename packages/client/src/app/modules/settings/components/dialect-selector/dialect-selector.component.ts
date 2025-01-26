import { Component, effect, Input, Signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RecognitionDialect, SupportedDialects } from '../../models/settings.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { languageSelector } from '../../../../selectors/settings.selector';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dialect-selector',
  templateUrl: './dialect-selector.component.html',
  styleUrls: ['./dialect-selector.component.scss'],
})
export class DialectSelectorComponent {
	@Input() group!: FormGroup;
	@Input() controlName!: string;

	public availableDialects: Signal<RecognitionDialect[] | undefined>;
	private dialects = SupportedDialects;

	constructor(private store: Store<AppState>) {
		this.availableDialects = toSignal(this.store.pipe(
			select(languageSelector),
			map((lang) => {
				const exp = new RegExp(lang);
				return this.dialects.filter((d) => exp.test(d))
			})
		));
		effect(() => {
			const control: AbstractControl | undefined = this.group.controls[this.controlName];
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
}
