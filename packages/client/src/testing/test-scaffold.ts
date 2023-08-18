import { ElementRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgIconsModule } from '@ng-icons/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable } from 'rxjs';
import { Icons } from 'shared-ui';
import { defaultAppState } from '../app/reducers/app.reducer';
import * as DE_TRANSLATIONS from '../assets/i18n/de.json';
import * as EN_TRANSLATIONS from '../assets/i18n/en.json';
import * as FR_TRANSLATIONS from '../assets/i18n/fr.json';
import * as IT_TRANSLATIONS from '../assets/i18n/it.json';
import * as SP_TRANSLATIONS from '../assets/i18n/sp.json';
import { ReactiveFormsModule } from '@angular/forms';
const actions$ = new Observable<Action>();

export const TestingModuleImports = [
  NoopAnimationsModule,
  RouterTestingModule,
  NgIconsModule.withIcons({
    ...Icons,
  }),
  TranslateTestingModule
    .withTranslations('en', EN_TRANSLATIONS)
    .withTranslations('de', DE_TRANSLATIONS)
    .withTranslations('fr', FR_TRANSLATIONS)
    .withTranslations('it', IT_TRANSLATIONS)
    .withTranslations('sp', SP_TRANSLATIONS),
  ReactiveFormsModule,
]

export const TestingModuleProviders = [
  provideMockStore({ initialState: defaultAppState }),
  provideMockActions(() => actions$),
]