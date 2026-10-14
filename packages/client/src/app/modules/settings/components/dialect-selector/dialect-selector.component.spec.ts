import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { DialectSelectorComponent } from './dialect-selector.component';

describe('DialectSelectorComponent', () => {
  let fixture: ComponentFixture<DialectSelectorComponent>;
  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [DialectSelectorComponent],
    }).compileComponents();

    group = new FormGroup({ dialect: new FormControl('unspecified'), lang: new FormControl('fr') });
    fixture = TestBed.createComponent(DialectSelectorComponent);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('controlName', 'dialect');
  });

  const optionValues = (): string[] =>
    Array.from<HTMLOptionElement>(fixture.nativeElement.querySelectorAll('option')).map((o) => o.value);

  it('is disabled with no options until a language is known', () => {
    fixture.detectChanges();
    expect(optionValues()).toEqual([]);
    expect(group.controls['dialect'].disabled).toBe(true);
  });

  it('offers "unspecified" and only the dialects of the given language', () => {
    fixture.componentRef.setInput('language', 'fr');
    fixture.detectChanges();
    const values = optionValues();
    expect(values[0]).toBe('unspecified');
    expect(values.length).toBeGreaterThan(1);
    expect(values.slice(1).every((d) => d.startsWith('fr-'))).toBe(true);
    expect(values).toContain('fr-CA');
    expect(group.controls['dialect'].enabled).toBe(true);
  });

  it('leaves out "unspecified" when disableUnspecified is set', () => {
    fixture.componentRef.setInput('disableUnspecified', true);
    fixture.componentRef.setInput('language', 'es');
    fixture.detectChanges();
    expect(optionValues()).not.toContain('unspecified');
    expect(optionValues()).toContain('es-US');
  });

  it('follows a language control in the same form group', () => {
    fixture.componentRef.setInput('languageControlName', 'lang');
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
    expect(optionValues()).toContain('fr-CA');
    group.controls['lang'].setValue('de');
    fixture.detectChanges();
    expect(optionValues()).toContain('de-AT');
    expect(optionValues()).not.toContain('fr-CA');
  });
});
