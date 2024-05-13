import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerHomeComponent } from './peer-home.component';

describe('PeerHomeComponent', () => {
  let component: PeerHomeComponent;
  let fixture: ComponentFixture<PeerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeerHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
