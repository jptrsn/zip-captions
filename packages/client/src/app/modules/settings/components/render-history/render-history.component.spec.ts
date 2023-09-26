import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderHistoryComponent } from './render-history.component';

describe('RenderHistoryComponent', () => {
  let component: RenderHistoryComponent;
  let fixture: ComponentFixture<RenderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
