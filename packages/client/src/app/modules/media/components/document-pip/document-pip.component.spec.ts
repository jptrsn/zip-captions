import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentPipComponent } from './document-pip.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('DocumentPipComponent', () => {
  let component: DocumentPipComponent;
  let fixture: ComponentFixture<DocumentPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [DocumentPipComponent],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
