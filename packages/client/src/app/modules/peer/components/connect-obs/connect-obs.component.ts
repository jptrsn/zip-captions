import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ObsActions } from '../../../../actions/obs.actions';
import { AppState } from '../../../../models/app.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected, selectObsError } from '../../../../selectors/obs.selectors';
import { RecognitionActions } from '../../../../models/recognition.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-connect-obs',
  templateUrl: './connect-obs.component.html',
  styleUrls: ['./connect-obs.component.scss'],
})
export class ConnectObsComponent {

  public connectionState: Signal<ObsConnectionState | undefined>;
  public isConnecting: Signal<boolean>;
  public isConnected: Signal<boolean>;
  public formGroup: FormGroup;
  public error: Signal<string | undefined>;
  
  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {

    this.connectionState = toSignal(this.store.select(selectObsConnected));
    this.error = toSignal(this.store.select(selectObsError));
    
    this.isConnected = computed(() => this.connectionState() === ObsConnectionState.connected);
    this.isConnecting = computed(() => this.connectionState() === ObsConnectionState.connecting);

    this.formGroup = this.fb.group({
      ip: this.fb.control<string | null>('192.168.1.139', [Validators.required]),
      port: this.fb.control<number | null>(4455, [Validators.required]),
      password: this.fb.control<string | null>('tooties')
    })
  }

  public saveObsWebsocket(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      const {ip, port, password}: {ip: string, port: number, password: string | null} = this.formGroup.value;
      console.log('form valid, dispatching');
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
}
