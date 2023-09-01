import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceWorkerUpdateComponent } from './service-worker-update.component';
import { TestingModuleImports, TestingModuleProviders } from '../../testing/test-scaffold';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('ServiceWorkerUpdateComponent', () => {
  let component: ServiceWorkerUpdateComponent;
  let fixture: ComponentFixture<ServiceWorkerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: false,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000',
        }),
      ],
      declarations: [ServiceWorkerUpdateComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceWorkerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
