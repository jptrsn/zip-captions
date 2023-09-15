import { Component, Signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ObsActions } from '../../../../actions/obs.actions';
import { AppState } from '../../../../models/app.model';
import { RecognitionActions } from '../../../../models/recognition.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected, selectObsError, selectObsStreamActive } from '../../../../selectors/obs.selectors';
import { recognitionActiveSelector } from '../../../../selectors/recognition.selector';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-connect-obs',
  templateUrl: './connect-obs.component.html',
  styleUrls: ['./connect-obs.component.scss'],
})
export class ConnectObsComponent {

  public connectionState: Signal<ObsConnectionState | undefined>;
  public isConnecting: Signal<boolean>;
  public isConnected: Signal<boolean>;
  public obsIsStreaming: Signal<boolean | undefined>;
  public formGroup: FormGroup;
  public error: Signal<string | undefined>;
  
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {

    this.connectionState = toSignal(this.store.select(selectObsConnected));
    this.error = toSignal(this.store.select(selectObsError));
    this.obsIsStreaming = toSignal(this.store.select(selectObsStreamActive));
    
    this.isConnected = computed(() => this.connectionState() === ObsConnectionState.connected);
    this.isConnecting = computed(() => this.connectionState() === ObsConnectionState.connecting);

    if (this.isConnected()) {
      this.startRecognition();
    }

    this.formGroup = this.fb.group({
      ip: this.fb.control<string | null>(null),
      port: this.fb.control<number | null>(null),
      password: this.fb.control<string | null>(null)
    });
  }

  public saveObsWebsocket(): void {
    this._autofillDefaultValue(this.formGroup.controls['ip'], '127.0.0.1');
    this._autofillDefaultValue(this.formGroup.controls['port'], 4455);
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {ip, port, password}: {ip: string, port: number, password: string | null} = this.formGroup.value;
      this.store.select(selectObsConnected).pipe(
        filter((conn) => conn === ObsConnectionState.connected),
        take(1)
      ).subscribe(() => this.startRecognition());
      this.store.dispatch(ObsActions.connect({ ip, port, password }));
    } else {
      this.formGroup.markAsTouched();
    }
  }

  public disconnect(): void {
    this.store.dispatch(ObsActions.disconnect())
  }

  public startRecognition(): void {
    this.store.dispatch(RecognitionActions.connectRecognition({id: 'stream'}));
  }

  public stopRecognition(): void {
    this.store.dispatch(RecognitionActions.disconnectRecognition({id: 'stream'}));
  }

  private _autofillDefaultValue(control: AbstractControl, value: string | number): ValidationErrors | null {
    if (control.value === null) {
      control.patchValue(value);
    }
    return null;
  }
}
