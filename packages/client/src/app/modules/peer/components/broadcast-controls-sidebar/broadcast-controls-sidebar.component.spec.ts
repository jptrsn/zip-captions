import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastControlsSidebarComponent } from './broadcast-controls-sidebar.component';

describe('BroadcastControlsSidebarComponent', () => {
  let component: BroadcastControlsSidebarComponent;
  let fixture: ComponentFixture<BroadcastControlsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadcastControlsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastControlsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
