import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModalComponent } from './cookie-modal.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';

describe('CookieModalComponent', () => {
  let component: CookieModalComponent;
  let fixture: ComponentFixture<CookieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [CookieModalComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(CookieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
