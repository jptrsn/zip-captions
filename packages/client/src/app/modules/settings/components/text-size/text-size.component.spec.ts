import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextSizeComponent } from './text-size.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('TextSizeComponent', () => {
  let component: TextSizeComponent;
  let fixture: ComponentFixture<TextSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [TextSizeComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(TextSizeComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      textSize: new FormControl()
    });
    component.controlName = 'textSize';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
