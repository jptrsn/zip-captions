import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerServerStatusChipComponent } from './peer-server-status-chip.component';

describe('PeerServerStatusChipComponent', () => {
  let component: PeerServerStatusChipComponent;
  let fixture: ComponentFixture<PeerServerStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeerServerStatusChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerServerStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
