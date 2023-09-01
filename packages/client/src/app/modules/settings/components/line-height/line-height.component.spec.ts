import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineHeightComponent } from './line-height.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('LineHeightComponent', () => {
  let component: LineHeightComponent;
  let fixture: ComponentFixture<LineHeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [LineHeightComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(LineHeightComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      lineHeight: new FormControl()
    });
    component.controlName = 'lineHeight';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
