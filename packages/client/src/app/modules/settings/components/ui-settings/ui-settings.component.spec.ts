import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { UserActions } from '../../../../actions/user.actions';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { selectUserSettingsSync } from '../../../../selectors/user.selector';
import { AppTheme, FontFamily, SettingsActions, SettingsState } from '../../models/settings.model';
import { UiSettingsComponent } from './ui-settings.component';

describe('UiSettingsComponent', () => {
  let component: UiSettingsComponent;
  let fixture: ComponentFixture<UiSettingsComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let navigate: jest.SpyInstance;
  let use: jest.SpyInstance;

  const stored: SettingsState = { ...defaultAppState.settings, theme: AppTheme.light, lang: 'fr', uiLanguage: 'spoken', dialect: 'fr-CA', renderHistory: 4, textSize: 'textSize-xl', lineHeight: 'lineHeight-snug', fontFamily: FontFamily.lexend, wakelock: false };

  const create = (opts: { cookies?: boolean; sync?: boolean; settings?: Partial<SettingsState> } = {}) => {
    store.setState({ ...defaultAppState, appearance: { ...defaultAppState.appearance, cookiesAccepted: opts.cookies ?? true }, settings: { ...stored, ...opts.settings } });
    store.overrideSelector(selectUserSettingsSync, opts.sync ?? false);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    use = jest.spyOn(TestBed.inject(TranslateService), 'use').mockReturnValue(of({}));
    fixture = TestBed.createComponent(UiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const form = () => component.formGroup.controls;
  const save = () => fixture.nativeElement.querySelector('[data-testid="zc-appearance-save"]') as HTMLButtonElement;
  const dispatched = () => dispatch.mock.calls.map(([action]) => action);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UiSettingsComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
  });

  describe('the form', () => {
    it('starts from the stored settings', () => {
      create();
      expect(component.formGroup.getRawValue()).toEqual({
        theme: AppTheme.light, lang: 'fr', uiLanguage: 'spoken', dialect: 'fr-CA', font: FontFamily.lexend,
        wakelock: false, renderHistory: 4, textSize: 'textSize-xl', lineHeight: 'lineHeight-snug',
      });
    });

    it('resets the dialect when a different spoken language is chosen', () => {
      create();
      form()['lang'].setValue('de');
      expect(form()['dialect'].value).toBe('unspecified');
    });

    it('keeps the dialect when the spoken language is set back to the stored one', () => {
      create();
      form()['dialect'].setValue('fr-BE');
      form()['lang'].setValue('fr');
      expect(form()['dialect'].value).toBe('fr-BE');
    });

    it('keeps Save disabled until something changes', () => {
      create();
      expect(save().disabled).toBe(true);
      form()['theme'].setValue(AppTheme.dark);
      form()['theme'].markAsDirty();
      fixture.detectChanges();
      expect(save().disabled).toBe(false);
    });

    it('warns, and keeps Save disabled, when cookies were declined', () => {
      create({ cookies: false });
      form()['theme'].markAsDirty();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.text-error')).toBeTruthy();
      expect(save().disabled).toBe(true);
    });
  });

  describe('preview', () => {
    it('shows the sample text with as many lines of history as chosen', async () => {
      create({ settings: { renderHistory: 2 } });
      // two lines of history and the live line
      expect(fixture.nativeElement.querySelectorAll('.recognized-text').length).toBe(3);
      form()['renderHistory'].setValue(0);
      fixture.detectChanges();
      // the lines leave with an animation
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.recognized-text').length).toBe(1);
    });

    it('styles the sample with the chosen size, line height and font', () => {
      create();
      expect(component.classList()).toContain('textSize-xl');
      form()['textSize'].setValue('textSize-4xl');
      form()['lineHeight'].setValue('lineHeight-loose');
      form()['font'].setValue(FontFamily.poppins);
      expect(component.classList()).toBe('recognized-text textSize-4xl lineHeight-loose font-poppins');
    });

    it('previews the theme on the component', () => {
      create();
      form()['theme'].setValue(AppTheme.dracula);
      expect(fixture.nativeElement.getAttribute('data-theme')).toBe(AppTheme.dracula);
    });

    it('previews the interface language: the spoken language, or a separate choice', () => {
      create();
      expect(use).toHaveBeenLastCalledWith('fr');
      form()['uiLanguage'].setValue('de');
      expect(use).toHaveBeenLastCalledWith('de');
      form()['uiLanguage'].setValue('spoken');
      form()['lang'].setValue('es');
      expect(use).toHaveBeenLastCalledWith('es');
    });

    it('goes back to the saved interface language when leaving with unsaved changes', () => {
      create();
      form()['lang'].markAsDirty();
      use.mockClear();
      fixture.destroy();
      expect(use).toHaveBeenCalledWith('fr');
    });

    it('leaves the interface language alone when leaving with nothing changed', () => {
      create();
      use.mockClear();
      fixture.destroy();
      expect(use).not.toHaveBeenCalled();
    });
  });

  describe('saving', () => {
    const change = () => {
      form()['theme'].setValue(AppTheme.dracula);
      form()['uiLanguage'].setValue('de');
      form()['lang'].setValue('de');
      form()['dialect'].setValue('de-AT');
      form()['wakelock'].setValue(true);
      form()['textSize'].setValue('textSize-4xl');
      form()['lineHeight'].setValue('lineHeight-loose');
      form()['renderHistory'].setValue(7);
      form()['font'].setValue(FontFamily.raleway);
    };

    it('applies every setting, the interface language before the spoken language', () => {
      create();
      change();
      expect(component.saveSettings()).toBe(false);
      expect(dispatched()).toEqual([
        SettingsActions.setTheme({ theme: AppTheme.dracula }),
        SettingsActions.setUiLanguage({ uiLanguage: 'de' }),
        SettingsActions.setLanguage({ language: 'de' }),
        SettingsActions.setDialect({ dialect: 'de-AT' }),
        SettingsActions.updateWakeLockEnabled({ enabled: true }),
        SettingsActions.setTextSize({ size: 'textSize-4xl' }),
        SettingsActions.setLineHeight({ height: 'lineHeight-loose' }),
        SettingsActions.setRenderHistory({ count: 7 }),
        SettingsActions.setFontFamily({ font: FontFamily.raleway }),
      ]);
    });

    it('does not set a dialect when none is chosen', () => {
      create();
      form()['dialect'].setValue(null);
      component.saveSettings();
      expect(dispatched().some((a) => a.type === SettingsActions.setDialect.type)).toBe(false);
    });

    it('treats a missing interface language as "same as spoken"', () => {
      create();
      form()['uiLanguage'].setValue(null);
      component.saveSettings();
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setUiLanguage({ uiLanguage: 'spoken' }));
    });

    it('leaves the form unchanged and goes home when the settings are not synced', () => {
      create({ sync: false });
      form()['theme'].markAsDirty();
      component.saveSettings();
      expect(component.formGroup.pristine).toBe(true);
      expect(navigate).toHaveBeenCalledWith(['']);
      expect(component.showSaveToServerModal).toBeFalsy();
    });

    it('offers to save to the server instead of leaving, when the settings are synced', () => {
      create({ sync: true });
      component.saveSettings();
      expect(component.showSaveToServerModal).toBe(true);
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  describe('saving to the server', () => {
    it('saves the settings state when the user agrees, closes the dialog and goes home', () => {
      create({ sync: true });
      component.showSaveToServerModal = true;
      component.saveToServerCallback(true);
      expect(dispatch).toHaveBeenCalledWith(UserActions.saveSettingsState({ settings: expect.objectContaining({ lang: 'fr', theme: AppTheme.light }) }));
      expect(component.showSaveToServerModal).toBe(false);
      expect(navigate).toHaveBeenCalledWith(['']);
    });

    it('only closes the dialog and goes home when the user declines', () => {
      create({ sync: true });
      component.showSaveToServerModal = true;
      component.saveToServerCallback(false);
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: UserActions.saveSettingsState.type }));
      expect(component.showSaveToServerModal).toBe(false);
      expect(navigate).toHaveBeenCalledWith(['']);
    });
  });
});
