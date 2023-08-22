import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastRenderComponent } from './broadcast-render.component';

describe('BroadcastRenderComponent', () => {
  let component: BroadcastRenderComponent;
  let fixture: ComponentFixture<BroadcastRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadcastRenderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
