import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfflineWarningComponent } from './offline-warning.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';

describe('OfflineWarningComponent', () => {
  let component: OfflineWarningComponent;
  let fixture: ComponentFixture<OfflineWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [OfflineWarningComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
