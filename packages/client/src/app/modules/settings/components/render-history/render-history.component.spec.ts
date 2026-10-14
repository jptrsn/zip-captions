import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RenderHistoryComponent } from './render-history.component';

describe('RenderHistoryComponent', () => {
  let fixture: ComponentFixture<RenderHistoryComponent>;
  let group: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [RenderHistoryComponent],
    }).compileComponents();

    group = new FormGroup({ renderHistory: new FormControl<number>(5) });
    fixture = TestBed.createComponent(RenderHistoryComponent);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('controlName', 'renderHistory');
    fixture.detectChanges();
  });

  const range = (): HTMLInputElement => fixture.nativeElement.querySelector('[data-testid="zc-appearance-render-history"]');

  it('shows the current number of history lines on the range input', () => {
    expect(range().value).toBe('5');
  });

  it('writes a changed range value to the form control', () => {
    range().value = '12';
    range().dispatchEvent(new Event('input'));
    expect(group.controls['renderHistory'].value).toBe(12);
  });

  it('limits the range to 0 through 15', () => {
    expect(range().min).toBe('0');
    expect(range().max).toBe('15');
  });
});
