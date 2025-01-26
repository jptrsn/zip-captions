import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialectSelectorComponent } from './dialect-selector.component';

describe('DialectSelectorComponent', () => {
  let component: DialectSelectorComponent;
  let fixture: ComponentFixture<DialectSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialectSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialectSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
