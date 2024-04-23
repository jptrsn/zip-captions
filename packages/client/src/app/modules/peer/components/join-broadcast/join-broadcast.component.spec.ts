import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinBroadcastComponent } from './join-broadcast.component';

describe('JoinBroadcastComponent', () => {
  let component: JoinBroadcastComponent;
  let fixture: ComponentFixture<JoinBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinBroadcastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
