import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookiePolicyComponent } from './cookie-policy.component';

describe('CookiePolicyComponent', () => {
  let component: CookiePolicyComponent;
  let fixture: ComponentFixture<CookiePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiePolicyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
