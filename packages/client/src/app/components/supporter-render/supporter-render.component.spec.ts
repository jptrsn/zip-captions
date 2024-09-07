import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupporterRenderComponent } from './supporter-render.component';

describe('SupporterRenderComponent', () => {
  let component: SupporterRenderComponent;
  let fixture: ComponentFixture<SupporterRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupporterRenderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupporterRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
