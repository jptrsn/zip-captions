import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let navigate: jest.SpyInstance;

  const create = (opts: { translatorSupported?: boolean; tabIndex?: string; cookies?: boolean } = {}) => {
    TestBed.overrideProvider(ChromeTranslatorService, { useValue: { isSupported: () => opts.translatorSupported ?? false } });
    TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { queryParams: opts.tabIndex === undefined ? {} : { tabIndex: opts.tabIndex } } } });
    const store = TestBed.inject(Store) as MockStore;
    store.setState({ ...defaultAppState, appearance: { ...defaultAppState.appearance, cookiesAccepted: opts.cookies ?? true } });
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const tabIds = () => Array.from<HTMLInputElement>(fixture.nativeElement.querySelectorAll('input[role="tab"]')).map((i) => i.id);
  const body = () => Array.from<Element>(fixture.nativeElement.querySelectorAll('div.overflow-y-auto > *')).map((e) => e.tagName.toLowerCase());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: ChromeTranslatorService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SettingsComponent],
    }).compileComponents();
  });

  describe('tabs', () => {
    it('lists the settings tabs, without translation when the browser cannot translate', () => {
      create({ translatorSupported: false });
      expect(tabIds()).toEqual(['appearance', 'transcription', 'sync', 'sharing', 'obs', 'engine']);
    });

    it('adds the translation tab after transcription when the browser can translate', () => {
      create({ translatorSupported: true });
      expect(tabIds()).toEqual(['appearance', 'transcription', 'translation', 'sync', 'sharing', 'obs', 'engine']);
    });

    it('has a test id and an icon for every tab', () => {
      create({ translatorSupported: true });
      for (const name of component.tabNames) {
        expect(fixture.nativeElement.querySelector(`[data-testid="zc-settings-tab-${name}"]`)).toBeTruthy();
        expect(component.tabIcons[name]).toBeTruthy();
      }
    });

    it('opens the first tab by default and shows its settings', () => {
      create();
      expect(component.tabIndex()).toBe(0);
      expect(body()).toEqual(['app-ui-settings']);
    });

    it('opens the tab from the tabIndex query parameter', () => {
      create({ tabIndex: '3' });
      expect(component.tabIndex()).toBe(3);
      expect(body()).toEqual(['app-broadcast-settings']);
    });

    it('wraps a tabIndex past the last tab', () => {
      create({ tabIndex: '8' });
      expect(component.tabIndex()).toBe(2);
      expect(body()).toEqual(['app-user-saved-settings']);
    });

    it('falls back to the first tab for a tabIndex that is not a number', () => {
      create({ tabIndex: 'abc' });
      expect(component.tabIndex()).toBe(0);
    });

    it('shows the settings of the chosen tab and puts the index in the URL', () => {
      create();
      component.tabsControl.setValue(1);
      fixture.detectChanges();
      expect(body()).toEqual(['app-transcription-settings']);
      expect(navigate).toHaveBeenCalledWith([], expect.objectContaining({ queryParams: { tabIndex: 1 }, queryParamsHandling: 'merge' }));
    });
  });

  describe('unsaved changes dialog', () => {
    it('hides the dialog and passes the answer on when it closes', () => {
      create();
      const answers: boolean[] = [];
      component.modalClosed$.subscribe((v) => answers.push(v));
      component.showUnsavedChangesModal = true;
      component.modalClosed(true);
      expect(component.showUnsavedChangesModal).toBe(false);
      component.modalClosed(false);
      expect(answers).toEqual([true, false]);
    });
  });

  it('knows whether cookies were accepted', () => {
    create({ cookies: false });
    expect(component.acceptedCookies()).toBe(false);
  });
});
