import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WakeLockEnabledComponent } from './wake-lock-enabled.component';

describe('WakeLockEnabledComponent', () => {
  let component: WakeLockEnabledComponent;
  let fixture: ComponentFixture<WakeLockEnabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WakeLockEnabledComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WakeLockEnabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
