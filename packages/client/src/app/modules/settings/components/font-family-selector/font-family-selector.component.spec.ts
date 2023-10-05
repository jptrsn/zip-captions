import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontFamilySelectorComponent } from './font-family-selector.component';

describe('FontFamilySelectorComponent', () => {
  let component: FontFamilySelectorComponent;
  let fixture: ComponentFixture<FontFamilySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FontFamilySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FontFamilySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
