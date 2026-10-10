import { Platform } from '@angular/cdk/platform';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationSettingsComponent } from './translation-settings.component';
import { defaultSettingsState } from '../../../../reducers/settings.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { TranslatorApiAdapter } from '../../../../services/translator/translator-api.adapter';

describe('TranslationSettingsComponent', () => {
  let component: TranslationSettingsComponent;
  let fixture: ComponentFixture<TranslationSettingsComponent>;

  const createComponent = async (opts: { apiAvailable: boolean; mobile: boolean }) => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [TranslationSettingsComponent],
      providers: [
        provideMockStore({
          initialState: {
            settings: defaultSettingsState
          }
        }),
        ChromeTranslatorService,
        {
          provide: TranslatorApiAdapter,
          useValue: {
            isAvailable: () => opts.apiAvailable,
            availability: jest.fn(() => Promise.resolve('available')),
            create: jest.fn()
          }
        },
        { provide: Platform, useValue: { ANDROID: opts.mobile, IOS: false } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const reasonText = (): string | undefined =>
    fixture.nativeElement.querySelector('[data-testid="zc-translation-unsupported-reason"]')?.textContent?.trim();

  it('should create', async () => {
    await createComponent({ apiAvailable: true, mobile: false });
    expect(component).toBeTruthy();
  });

  it('enables the form on eligible desktop browsers', async () => {
    await createComponent({ apiAvailable: true, mobile: false });
    expect(component.formGroup.disabled).toBe(false);
    expect(reasonText()).toBeUndefined();
  });

  it('disables the form and explains why when the browser lacks the Translator API', async () => {
    await createComponent({ apiAvailable: false, mobile: false });
    expect(component.formGroup.disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('[data-testid="zc-translation-enable"]').disabled).toBe(true);
    expect(reasonText()).toBe('SETTINGS.TRANSLATION.unsupportedHint');
  });

  it('disables the form with a mobile-specific explanation on phones and tablets', async () => {
    await createComponent({ apiAvailable: true, mobile: true });
    expect(component.formGroup.disabled).toBe(true);
    expect(reasonText()).toBe('SETTINGS.TRANSLATION.unsupportedMobileHint');
  });
});
