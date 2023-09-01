import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullScreenComponent } from './full-screen.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('FullScreenComponent', () => {
  let component: FullScreenComponent;
  let fixture: ComponentFixture<FullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [FullScreenComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(FullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
