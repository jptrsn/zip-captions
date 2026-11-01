import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { AvailableFontFamilies, FontFamily } from '../../models/settings.model';
import { FontFamilySelectorComponent } from './font-family-selector.component';

describe('FontFamilySelectorComponent', () => {
  let fixture: ComponentFixture<FontFamilySelectorComponent>;
  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [FontFamilySelectorComponent],
    }).compileComponents();

    group = new FormGroup({ fontFamily: new FormControl<FontFamily>(FontFamily.sans) });
    fixture = TestBed.createComponent(FontFamilySelectorComponent);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('controlName', 'fontFamily');
    fixture.detectChanges();
  });

  const select = (): HTMLSelectElement => fixture.nativeElement.querySelector('[data-testid="zc-appearance-font"]');

  it('offers every available font family', () => {
    const options = Array.from(select().options).map((o) => o.value);
    expect(options.sort()).toEqual([...AvailableFontFamilies].sort());
  });

  it('shows the current font family as selected', () => {
    expect(select().value).toBe(FontFamily.sans);
  });

  it('writes the chosen font family to the form control', () => {
    select().value = FontFamily.lexend;
    select().dispatchEvent(new Event('change'));
    expect(group.controls['fontFamily'].value).toBe(FontFamily.lexend);
  });
});
