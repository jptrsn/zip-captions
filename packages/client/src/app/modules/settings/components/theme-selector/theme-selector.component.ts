import { Component, Input, OnDestroy, OnInit, Signal, effect } from '@angular/core';
import { AppActions, AppState, AppTheme } from '../../../../models/app.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { themeSelector } from '../../../../selectors/app.selector';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  @Input() group!: FormGroup;
  @Input() controlName!: string;
  public themes = AppTheme;
}
