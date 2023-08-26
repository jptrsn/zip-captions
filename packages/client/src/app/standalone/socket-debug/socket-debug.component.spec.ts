import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketDebugComponent } from './socket-debug.component';

describe('SocketDebugComponent', () => {
  let component: SocketDebugComponent;
  let fixture: ComponentFixture<SocketDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketDebugComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SocketDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
