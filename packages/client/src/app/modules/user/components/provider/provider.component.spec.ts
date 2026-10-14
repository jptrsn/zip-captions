import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderComponent } from './provider.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      // Shallow render: the child components have their own specs
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProviderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
