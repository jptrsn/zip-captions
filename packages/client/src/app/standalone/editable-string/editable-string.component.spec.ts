import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditableStringComponent } from './editable-string.component';

describe('EditableStringComponent', () => {
  let fixture: ComponentFixture<EditableStringComponent>;
  let group: FormGroup;

  const create = (inputs: Record<string, unknown> = {}, control = new FormControl('start', { updateOn: 'blur', validators: [Validators.required] })) => {
    group = new FormGroup({ title: control });
    fixture = TestBed.createComponent(EditableStringComponent);
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('controlName', 'title');
    for (const [name, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(name, value);
    }
    fixture.detectChanges();
  };
  const input = () => fixture.nativeElement.querySelector('input') as HTMLInputElement | null;
  const textarea = () => fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EditableStringComponent] }).compileComponents();
  });

  it('shows a text input with the current value by default', () => {
    create();
    expect(input()?.value).toBe('start');
    expect(textarea()).toBeNull();
  });

  it('shows a textarea instead for the textarea type', () => {
    create({ type: 'textarea' });
    expect(textarea()?.value).toBe('start');
    expect(input()).toBeNull();
  });

  it('shows the label and the placeholder only when given', () => {
    create();
    expect(fixture.nativeElement.querySelector('label')).toBeNull();
    fixture.destroy();
    create({ label: 'Title', placeholder: 'Type here' });
    expect(fixture.nativeElement.querySelector('.label-text').textContent).toBe('Title');
    expect(input()?.placeholder).toBe('Type here');
  });

  it('only writes the value to the form when the field loses focus', () => {
    create();
    input()!.value = 'changed';
    input()!.dispatchEvent(new Event('input'));
    expect(group.controls['title'].value).toBe('start');
    input()!.dispatchEvent(new Event('blur'));
    expect(group.controls['title'].value).toBe('changed');
  });

  it('marks the field as an error once an invalid value has been edited', () => {
    create();
    expect(input()!.classList).not.toContain('input-error');
    input()!.value = '';
    input()!.dispatchEvent(new Event('input'));
    input()!.dispatchEvent(new Event('blur'));
    group.controls['title'].markAsDirty();
    fixture.detectChanges();
    expect(input()!.classList).toContain('input-error');
  });

  it('warns when the control does not update on blur', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    create({}, new FormControl('x'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("updateOn 'change'"));
    warn.mockRestore();
  });

  it('does not warn for a control that updates on blur', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    create();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
