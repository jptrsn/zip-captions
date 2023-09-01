import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognitionControlSidebarComponent } from './recognition-control-sidebar.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('RecognitionControlSidebarComponent', () => {
  let component: RecognitionControlSidebarComponent;
  let fixture: ComponentFixture<RecognitionControlSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [RecognitionControlSidebarComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognitionControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
