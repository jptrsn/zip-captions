import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdPartyConnectionsComponent } from './third-party-connections.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { ConnectObsComponent } from '../connect-obs/connect-obs.component';

describe('ThirdPartyConnectionsComponent', () => {
  let component: ThirdPartyConnectionsComponent;
  let fixture: ComponentFixture<ThirdPartyConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        ThirdPartyConnectionsComponent,
        ConnectObsComponent,
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(ThirdPartyConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
