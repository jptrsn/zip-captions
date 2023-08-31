import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceWorkerUpdateComponent } from './service-worker-update.component';

describe('ServiceWorkerUpdateComponent', () => {
  let component: ServiceWorkerUpdateComponent;
  let fixture: ComponentFixture<ServiceWorkerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceWorkerUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceWorkerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
