import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeerLandingComponent } from './peer-landing.component';

describe('PeerLandingComponent', () => {
  let component: PeerLandingComponent;
  let fixture: ComponentFixture<PeerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeerLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
