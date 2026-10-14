import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { selectRecognitionEngine } from '../../../../selectors/recognition.selector';
import { ProviderComponent } from './provider.component';

describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  const create = (provider: 'web' | 'azure') => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectRecognitionEngine, { provider } as never);
    store.refreshState();
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProviderComponent],
    }).compileComponents();
  });

  it('offers the engine selector', () => {
    create('web');
    expect(fixture.nativeElement.querySelector('app-recognition-engine-select')).toBeTruthy();
  });

  it.each(['web', 'azure'] as const)('describes the %s engine that is in use', (provider) => {
    create(provider);
    const translate = TestBed.inject(TranslateService);
    expect(component.provider()).toBe(provider);
    const text = fixture.nativeElement.textContent;
    expect(text).toContain(translate.instant(`USER.PROVIDER.${provider}.label`));
    expect(text).toContain(translate.instant(`USER.PROVIDER.${provider}.description`));
  });

  it('describes a different engine after the choice changes', () => {
    create('web');
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectRecognitionEngine, { provider: 'azure' } as never);
    store.refreshState();
    fixture.detectChanges();
    expect(component.provider()).toBe('azure');
  });
});
