import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognizedLiveTextComponent } from './recognized-live-text.component';

describe('RecognizedLiveTextComponent', () => {
  let component: RecognizedLiveTextComponent;
  let fixture: ComponentFixture<RecognizedLiveTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognizedLiveTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizedLiveTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
