import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModuleImports } from '../../../testing/test-scaffold';
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog.component';

describe('UnsavedChangesDialogComponent', () => {
  let component: UnsavedChangesDialogComponent;
  let fixture: ComponentFixture<UnsavedChangesDialogComponent>;
  const dialog = () => fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
  const button = (id: string) => fixture.nativeElement.querySelector(`[data-testid="${id}"]`) as HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedChangesDialogComponent, ...TestingModuleImports],
    }).compileComponents();

    fixture = TestBed.createComponent(UnsavedChangesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts closed', () => {
    expect(dialog().open).toBe(false);
  });

  it('opens when openModal is set to true, and closes when it is set back to false', () => {
    fixture.componentRef.setInput('openModal', true);
    fixture.detectChanges();
    expect(dialog().open).toBe(true);
    fixture.componentRef.setInput('openModal', false);
    fixture.detectChanges();
    expect(dialog().open).toBe(false);
  });

  it('stays closed when openModal is left undefined', () => {
    fixture.componentRef.setInput('openModal', undefined);
    fixture.detectChanges();
    expect(dialog().open).toBe(false);
  });

  it('closes and emits true when the user accepts', () => {
    const closed: boolean[] = [];
    component.afterClosed.subscribe((v) => closed.push(v));
    fixture.componentRef.setInput('openModal', true);
    fixture.detectChanges();
    button('zc-settings-unsaved-confirm').click();
    fixture.detectChanges();
    expect(closed).toEqual([true]);
    expect(dialog().open).toBe(false);
  });

  it('closes and emits false when the user declines', () => {
    const closed: boolean[] = [];
    component.afterClosed.subscribe((v) => closed.push(v));
    fixture.componentRef.setInput('openModal', true);
    fixture.detectChanges();
    button('zc-settings-unsaved-cancel').click();
    fixture.detectChanges();
    expect(closed).toEqual([false]);
    expect(dialog().open).toBe(false);
  });
});
