import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastSessionComponent } from './broadcast-session.component';

describe('BroadcastSessionComponent', () => {
  let component: BroadcastSessionComponent;
  let fixture: ComponentFixture<BroadcastSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadcastSessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
