import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinCodeComponent } from './join-code.component';

describe('JoinCodeComponent', () => {
  let component: JoinCodeComponent;
  let fixture: ComponentFixture<JoinCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
