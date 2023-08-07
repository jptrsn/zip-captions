import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketServerStatusChipComponent } from './socket-server-status-chip.component';

describe('SocketServerStatusChipComponent', () => {
  let component: SocketServerStatusChipComponent;
  let fixture: ComponentFixture<SocketServerStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocketServerStatusChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocketServerStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
