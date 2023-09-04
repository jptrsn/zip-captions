import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowDirectionComponent } from './flow-direction.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('FlowDirectionComponent', () => {
  let component: FlowDirectionComponent;
  let fixture: ComponentFixture<FlowDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [FlowDirectionComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(FlowDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
