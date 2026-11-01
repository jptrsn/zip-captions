import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { TranscriptEnabledComponent } from './transcript-enabled.component';

describe('TranscriptEnabledComponent', () => {
  let component: TranscriptEnabledComponent;
  let fixture: ComponentFixture<TranscriptEnabledComponent>;
  let group: FormGroup;

  const checkbox = () => fixture.nativeElement.querySelector('[data-testid="zc-transcript-enabled"]') as HTMLInputElement;
  const labels = () => Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.label-text')).map((e) => e.textContent);
  const text = (key: string) => TestBed.inject(TranslateService).instant(key);

  const create = (enabled: boolean) => {
    group = new FormGroup({ enabled: new FormControl(enabled) });
    fixture = TestBed.createComponent(TranscriptEnabledComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('group', group);
    fixture.componentRef.setInput('controlName', 'enabled');
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [TranscriptEnabledComponent],
    }).compileComponents();
  });

  it('starts from the value of the form control', () => {
    create(false);
    expect(component.isEnabled()).toBe(false);
    expect(checkbox().checked).toBe(false);
    fixture.destroy();
    create(true);
    expect(component.isEnabled()).toBe(true);
    expect(checkbox().checked).toBe(true);
  });

  it('follows the form control, and switches between the enabled and disabled label', () => {
    create(true);
    expect(labels()).toEqual([text('LABELS.transcriptEnabled')]);
    group.controls['enabled'].setValue(false);
    fixture.detectChanges();
    expect(component.isEnabled()).toBe(false);
    expect(labels()).toEqual([text('LABELS.transcriptDisabled')]);
    expect(text('LABELS.transcriptDisabled')).not.toBe(text('LABELS.transcriptEnabled'));
  });

  it('writes the checkbox back to the form control', () => {
    create(false);
    checkbox().click();
    expect(group.controls['enabled'].value).toBe(true);
  });

  it('stops following the form control once destroyed', () => {
    create(true);
    fixture.destroy();
    group.controls['enabled'].setValue(false);
    expect(component.isEnabled()).toBe(true);
  });
});
