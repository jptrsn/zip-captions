import { Component } from '@angular/core';
import { AppTheme } from '../../models/app.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  public themes = AppTheme;
  constructor(private formBuilder: FormBuilder) {}
}
