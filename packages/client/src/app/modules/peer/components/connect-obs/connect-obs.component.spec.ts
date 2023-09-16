import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectObsComponent } from './connect-obs.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('ConnectObsComponent', () => {
  let component: ConnectObsComponent;
  let fixture: ComponentFixture<ConnectObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [ConnectObsComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
