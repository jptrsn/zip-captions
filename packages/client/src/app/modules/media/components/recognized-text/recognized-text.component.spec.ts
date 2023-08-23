import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecognizedTextComponent } from './recognized-text.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { signal } from '@angular/core';
import { ProperPipe } from 'packages/shared-ui/src/lib/pipes/proper.pipe';

describe('RecognizedTextComponent', () => {
  let component: RecognizedTextComponent;
  let fixture: ComponentFixture<RecognizedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        RecognizedTextComponent,
        ProperPipe
      ],
      providers: TestingModuleProviders
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizedTextComponent);
    component = fixture.componentInstance;
    component.connected = signal(true);
    component.hasLiveResults = signal(true);
    component.textOutput = signal(['hello', 'world']);
    component.error = signal(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
