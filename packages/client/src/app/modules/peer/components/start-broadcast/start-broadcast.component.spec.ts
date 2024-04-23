import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartBroadcastComponent } from './start-broadcast.component';

describe('StartBroadcastComponent', () => {
  let component: StartBroadcastComponent;
  let fixture: ComponentFixture<StartBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartBroadcastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
