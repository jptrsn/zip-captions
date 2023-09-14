import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreamCaptionsComponent } from './stream-captions.component';

describe('StreamCaptionsComponent', () => {
  let component: StreamCaptionsComponent;
  let fixture: ComponentFixture<StreamCaptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreamCaptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreamCaptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
