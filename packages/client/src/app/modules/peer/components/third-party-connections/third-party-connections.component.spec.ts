import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdPartyConnectionsComponent } from './third-party-connections.component';

describe('ThirdPartyConnectionsComponent', () => {
  let component: ThirdPartyConnectionsComponent;
  let fixture: ComponentFixture<ThirdPartyConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyConnectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
