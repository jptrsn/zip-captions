import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndBroadcastComponent } from './end-broadcast.component';

describe('EndBroadcastComponent', () => {
  let component: EndBroadcastComponent;
  let fixture: ComponentFixture<EndBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndBroadcastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
