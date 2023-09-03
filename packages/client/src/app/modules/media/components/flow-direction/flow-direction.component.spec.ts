import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowDirectionComponent } from './flow-direction.component';

describe('FlowDirectionComponent', () => {
  let component: FlowDirectionComponent;
  let fixture: ComponentFixture<FlowDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowDirectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
