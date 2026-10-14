import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHomeComponent } from './user-home.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      // Shallow render: the child components have their own specs
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
