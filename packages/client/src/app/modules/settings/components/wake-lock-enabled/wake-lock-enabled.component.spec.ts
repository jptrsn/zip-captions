import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WakeLockEnabledComponent } from './wake-lock-enabled.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('WakeLockEnabledComponent', () => {
  let component: WakeLockEnabledComponent;
  let fixture: ComponentFixture<WakeLockEnabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        ReactiveFormsModule
      ],
      declarations: [WakeLockEnabledComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(WakeLockEnabledComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      wakelock: new FormControl(true)
    })
    component.controlName = 'wakelock';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
