import { AfterViewInit, Component, effect, Input, OnChanges, OnDestroy, signal, Signal, SimpleChanges, WritableSignal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RecognitionDialect, SupportedDialects } from '../../models/settings.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../models/app.model';
import { languageSelector } from '../../../../selectors/settings.selector';
import { map, startWith, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dialect-selector',
  templateUrl: './dialect-selector.component.html',
  styleUrls: ['./dialect-selector.component.scss'],
})
export class DialectSelectorComponent implements OnChanges, OnDestroy {
	@Input() group!: FormGroup;
	@Input() controlName!: string;
	@Input() languageControlName!: string;

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
		if (changes['group'] && changes['languageControlName'] && !this.hasSubscription) {
			const languageControl = this.group.get(this.languageControlName);
			if (languageControl) {
				this.hasSubscription = true;
				languageControl.valueChanges.pipe(
					startWith(languageControl.value),
					takeUntil(this.onDestroy$)
				).subscribe((language) => {
					const exp = new RegExp(language);
					const ad = this.dialects.filter((d) => exp.test(d));
					ad.unshift('unspecified')
					this.availableDialects.set(ad)
				})
			}
		}
	}

	ngOnDestroy(): void {
		this.onDestroy$.next();
	}
}
