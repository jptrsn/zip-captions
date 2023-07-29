import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSelectorComponent } from './theme-selector.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProperPipe } from 'packages/shared-ui/src/lib/pipes/proper.pipe';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        ReactiveFormsModule,
      ],
      declarations: [
        ThemeSelectorComponent,
        ProperPipe,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      theme: new FormControl()
    })
    component.controlName = 'theme';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
