import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetectPwaInstallComponent } from './detect-pwa-install.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import '../../../testing/matchMedia.mock';

describe('DetectPwaInstallComponent', () => {
  let component: DetectPwaInstallComponent;
  let fixture: ComponentFixture<DetectPwaInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [DetectPwaInstallComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(DetectPwaInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
