import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveSessionComponent } from './leave-session.component';

describe('LeaveSessionComponent', () => {
  let component: LeaveSessionComponent;
  let fixture: ComponentFixture<LeaveSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveSessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
