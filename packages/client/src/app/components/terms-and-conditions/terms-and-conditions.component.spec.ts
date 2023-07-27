import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';

describe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent;
  let fixture: ComponentFixture<TermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [TermsAndConditionsComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
