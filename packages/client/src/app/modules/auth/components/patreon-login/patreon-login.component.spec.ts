import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatreonLoginComponent } from './patreon-login.component';

describe('PatreonLoginComponent', () => {
  let component: PatreonLoginComponent;
  let fixture: ComponentFixture<PatreonLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatreonLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatreonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
