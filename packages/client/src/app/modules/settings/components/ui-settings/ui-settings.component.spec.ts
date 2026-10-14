import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSettingsComponent } from './ui-settings.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('UiSettingsComponent', () => {
  let component: UiSettingsComponent;
  let fixture: ComponentFixture<UiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      // Shallow render: the child components have their own specs
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UiSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
