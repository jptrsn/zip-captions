import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionControlSidebarComponent } from './recognition-control-sidebar.component';

describe('RecognitionControlSidebarComponent', () => {
  let component: RecognitionControlSidebarComponent;
  let fixture: ComponentFixture<RecognitionControlSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecognitionControlSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
