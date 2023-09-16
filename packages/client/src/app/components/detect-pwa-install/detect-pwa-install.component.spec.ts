import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetectPwaInstallComponent } from './detect-pwa-install.component';

describe('DetectPwaInstallComponent', () => {
  let component: DetectPwaInstallComponent;
  let fixture: ComponentFixture<DetectPwaInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetectPwaInstallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetectPwaInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
