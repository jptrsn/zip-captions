import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioInputEnableComponent } from './audio-input-enable.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { BackgroundMagnitudeDirective } from '../../../../directives/background-magnitude.directive';

describe('AudioInputEnableComponent', () => {
  let component: AudioInputEnableComponent;
  let fixture: ComponentFixture<AudioInputEnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ...TestingModuleImports,
        BackgroundMagnitudeDirective,
      ],
      declarations: [
        AudioInputEnableComponent,
      ],
      providers: TestingModuleProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AudioInputEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
