import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcceptPeerConnectionsModalComponent } from './accept-peer-connections-modal.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';

describe('AcceptPeerConnectionsModalComponent', () => {
  let component: AcceptPeerConnectionsModalComponent;
  let fixture: ComponentFixture<AcceptPeerConnectionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [AcceptPeerConnectionsModalComponent],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptPeerConnectionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
