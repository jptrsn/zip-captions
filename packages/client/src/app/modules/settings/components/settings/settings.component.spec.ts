import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProperPipe } from 'packages/shared-ui/src/lib/pipes/proper.pipe';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { WakeLockEnabledComponent } from '../wake-lock-enabled/wake-lock-enabled.component';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        ReactiveFormsModule,
      ],
      declarations: [
        ProperPipe,
        SettingsComponent,
        ThemeSelectorComponent,
        LanguageSelectorComponent,
        WakeLockEnabledComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
