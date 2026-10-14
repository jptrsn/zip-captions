import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { RecognitionActions } from '../../actions/recogntion.actions';
import { selectRecognitionEngine } from '../../selectors/recognition.selector';
import { RecognitionEngineSelectComponent } from './recognition-engine-select.component';

describe('RecognitionEngineSelectComponent', () => {
  let component: RecognitionEngineSelectComponent;
  let fixture: ComponentFixture<RecognitionEngineSelectComponent>;
  let dispatch: jest.SpyInstance;

  const select = () => fixture.nativeElement.querySelector('[data-testid="zc-engine-select-shared"]') as HTMLSelectElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognitionEngineSelectComponent, ...TestingModuleImports],
      providers: [...TestingModuleProviders],
    }).compileComponents();
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectRecognitionEngine, { provider: 'azure' } as never);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(RecognitionEngineSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('offers the browser and Azure engines', () => {
    expect(Array.from(select().options).map((o) => o.value)).toEqual(['web', 'azure']);
  });

  it('shows the engine from the store as selected, without dispatching', () => {
    expect(component.provider()).toBe('azure');
    expect(select().value).toBe('azure');
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('dispatches the chosen engine when the user changes the selection', () => {
    select().value = 'web';
    select().dispatchEvent(new Event('change'));
    expect(dispatch).toHaveBeenCalledWith(RecognitionActions.setEngine({ engine: 'web' }));
  });
});
