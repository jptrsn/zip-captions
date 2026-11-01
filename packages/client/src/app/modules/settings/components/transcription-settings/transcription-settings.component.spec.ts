import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectTranscriptionEnabled, selectTranscriptSettingsLoading, selectTranscriptTitlePattern } from '../../../../selectors/settings.selector';
import { SettingsActions } from '../../models/settings.model';
import { TranscriptionSettingsComponent } from './transcription-settings.component';

describe('TranscriptionSettingsComponent', () => {
  let component: TranscriptionSettingsComponent;
  let fixture: ComponentFixture<TranscriptionSettingsComponent>;
  let dispatch: jest.SpyInstance;

  const create = (opts: { loggedIn?: boolean; enabled?: boolean; pattern?: string; loading?: boolean } = {}) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserLoggedIn, opts.loggedIn ?? true);
    store.overrideSelector(selectTranscriptionEnabled, opts.enabled ?? false);
    store.overrideSelector(selectTranscriptTitlePattern, opts.pattern as string);
    store.overrideSelector(selectTranscriptSettingsLoading, opts.loading ?? false);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(TranscriptionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const saveButton = () => fixture.nativeElement.querySelector('[data-testid="zc-transcript-save"]') as HTMLButtonElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TranscriptionSettingsComponent],
    }).compileComponents();
  });

  it('starts from the stored settings', () => {
    create({ enabled: true, pattern: 'Sunday' });
    expect(component.formGroup.value).toEqual({ enabled: true, titlePattern: 'Sunday' });
  });

  it('asks a signed-out user to sign in instead of showing the form', () => {
    create({ loggedIn: false });
    expect(saveButton()).toBeFalsy();
  });

  it('keeps Save disabled until something changes, and while loading', () => {
    create();
    expect(saveButton()?.disabled).toBe(true);
    component.formGroup.controls.enabled.setValue(true);
    component.formGroup.markAsDirty();
    fixture.detectChanges();
    expect(saveButton()?.disabled).toBe(false);
    fixture.destroy();
    create({ loading: true });
    component.formGroup.markAsDirty();
    fixture.detectChanges();
    expect(saveButton()?.disabled).toBe(true);
  });

  it('saves the enabled flag, and the title pattern only when one is entered', () => {
    create();
    component.formGroup.controls.enabled.setValue(true);
    component.saveSettings();
    expect(dispatch).toHaveBeenCalledWith(SettingsActions.saveTranscriptionSettings({ transcription: { enabled: true } }));
    component.formGroup.controls.titlePattern.setValue('Sunday');
    component.saveSettings();
    expect(dispatch).toHaveBeenLastCalledWith(SettingsActions.saveTranscriptionSettings({ transcription: { enabled: true, titlePattern: 'Sunday' } }));
  });

  it('is pristine again after saving', () => {
    create();
    component.formGroup.markAsDirty();
    component.saveSettings();
    expect(component.formGroup.pristine).toBe(true);
  });
});
