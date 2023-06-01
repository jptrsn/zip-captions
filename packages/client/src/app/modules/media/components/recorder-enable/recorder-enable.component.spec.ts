import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecorderEnableComponent } from './recorder-enable.component';

describe('RecorderEnableComponent', () => {
  let component: RecorderEnableComponent;
  let fixture: ComponentFixture<RecorderEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecorderEnableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecorderEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
