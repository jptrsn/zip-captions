import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObsConnectionStatusChipComponent } from './obs-connection-status-chip.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { ProperPipe } from 'packages/shared-ui/src/lib/pipes/proper.pipe';

describe('ObsConnectionStatusChipComponent', () => {
  let component: ObsConnectionStatusChipComponent;
  let fixture: ComponentFixture<ObsConnectionStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        ObsConnectionStatusChipComponent,
        ProperPipe,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ObsConnectionStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
