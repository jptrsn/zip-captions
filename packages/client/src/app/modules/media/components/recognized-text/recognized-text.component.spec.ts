import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognizedTextComponent } from './recognized-text.component';

describe('RecognizedTextComponent', () => {
  let component: RecognizedTextComponent;
  let fixture: ComponentFixture<RecognizedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognizedTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
