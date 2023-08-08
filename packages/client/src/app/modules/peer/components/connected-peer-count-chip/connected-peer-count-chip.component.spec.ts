import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedPeerCountChipComponent } from './connected-peer-count-chip.component';

describe('ConnectedPeerCountChipComponent', () => {
  let component: ConnectedPeerCountChipComponent;
  let fixture: ComponentFixture<ConnectedPeerCountChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedPeerCountChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedPeerCountChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
