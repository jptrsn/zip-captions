import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        ReactiveFormsModule,
      ],
      declarations: [LanguageSelectorComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      lang: new FormControl()
    })
    component.controlName = 'lang';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
