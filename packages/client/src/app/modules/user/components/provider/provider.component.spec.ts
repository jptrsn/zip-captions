import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderComponent } from './provider.component';

describe('ProviderComponent', () => {
  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
