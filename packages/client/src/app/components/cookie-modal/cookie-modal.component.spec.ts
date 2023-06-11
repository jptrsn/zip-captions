import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModalComponent } from './cookie-modal.component';

describe('CookieModalComponent', () => {
  let component: CookieModalComponent;
  let fixture: ComponentFixture<CookieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookieModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
