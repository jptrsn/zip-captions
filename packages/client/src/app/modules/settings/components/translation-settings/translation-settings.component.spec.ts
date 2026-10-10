import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationSettingsComponent } from './translation-settings.component';
import { defaultSettingsState } from '../../../../reducers/settings.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';

describe('TranslationSettingsComponent', () => {
  let component: TranslationSettingsComponent;
  let fixture: ComponentFixture<TranslationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [TranslationSettingsComponent],
      providers: [
        provideMockStore({
          initialState: {
            settings: defaultSettingsState
          }
        }),
        ChromeTranslatorService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
