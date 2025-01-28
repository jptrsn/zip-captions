import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecognitionEngineState } from '../../models/recognition.model';
import { selectRecognitionEngine } from '../../selectors/recognition.selector';
import { map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../../models/app.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecognitionActions } from '../../actions/recogntion.actions';

@Component({
  selector: 'app-recognition-engine-select',
  standalone: true,
  imports: [
		CommonModule,
		StoreModule,
		EffectsModule,
		ReactiveFormsModule,
	],
  templateUrl: './recognition-engine-select.component.html',
  styleUrls: ['./recognition-engine-select.component.scss'],
})
export class RecognitionEngineSelectComponent {
	public provider: Signal<RecognitionEngineState['provider'] | undefined>;
	public group: FormGroup;
	public providers: { value: RecognitionEngineState['provider'], label: string }[] = [
		{ value: 'web', label: 'Browser API (standard)' },
		{ value: 'azure', label: 'Azure Cognitive Services (experimental)'}
	]
	constructor(private store: Store<AppState>,
							private fb: FormBuilder
	) {
		this.provider = toSignal(this.store.pipe(
			select(selectRecognitionEngine),
			map((e) => e?.provider )
		));
		this.group = this.fb.group({
			provider: this.fb.control(this.provider())
		});
		this.group.controls['provider'].valueChanges.pipe(
			takeUntilDestroyed()
		).subscribe((v) => {
			this.store.dispatch(RecognitionActions.setEngine({ engine: v }))
		})
	}
}
