import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { RecognitionService } from '../../../media/services/recognition.service';
import { StreamCaptionsComponent } from './stream-captions.component';

describe('StreamCaptionsComponent', () => {
  let component: StreamCaptionsComponent;
  let fixture: ComponentFixture<StreamCaptionsComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  const live = signal('');

  const create = (opts: { connected?: boolean; paused?: boolean } = {}) => {
    store.overrideSelector(recognitionConnectedSelector, opts.connected ?? false);
    store.overrideSelector(recognitionPausedSelector, opts.paused ?? false);
    store.refreshState();
    fixture = TestBed.createComponent(StreamCaptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const has = (selector: string) => !!fixture.nativeElement.querySelector(selector);

  beforeEach(async () => {
    live.set('hello viewers');
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      // The real service starts the browser's speech recogniser
      providers: [...TestingModuleProviders, { provide: RecognitionService, useValue: { getLiveOutput: () => live } }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StreamCaptionsComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('shows the live text while recognition is connected', () => {
    create({ connected: true });
    expect(component.liveText()).toBe('hello viewers');
    expect(has('app-recognized-live-text')).toBe(true);
  });

  it('keeps the live text while paused, and shows the paused notice and the drawer button', () => {
    create({ paused: true });
    expect(component.liveText()).toBe('hello viewers');
    expect(fixture.nativeElement.querySelector('.badge-warning')).toBeTruthy();
    expect(has('label.drawer-button')).toBe(true);
  });

  it('shows nothing, and no controls button, when recognition is not running', () => {
    create();
    expect(component.liveText()).toBe('');
    expect(has('app-recognized-live-text')).toBe(false);
    expect(has('label.drawer-button')).toBe(false);
    expect(fixture.nativeElement.querySelector('.badge-warning')).toBeNull();
  });

  it('hides the live text component when there is no text yet', () => {
    live.set('');
    create({ connected: true });
    expect(has('app-recognized-live-text')).toBe(false);
  });

  it('shows the controls sidebar with the fullscreen, text flow and PiP controls turned off', () => {
    create({ connected: true });
    const sidebar = fixture.debugElement.query(By.css('app-recognition-control-sidebar'));
    expect(sidebar).toBeTruthy();
    expect(sidebar.properties['showFullscreen']).toBe(false);
    expect(sidebar.properties['showTextFlow']).toBe(false);
    expect(sidebar.properties['showPip']).toBe(false);
  });

  it('stops the stream recognition when the page is left while connected', () => {
    create({ connected: true });
    fixture.destroy();
    expect(dispatch).toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'stream' }));
  });

  it('dispatches nothing on leaving when recognition was not connected', () => {
    create({ connected: false });
    fixture.destroy();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
