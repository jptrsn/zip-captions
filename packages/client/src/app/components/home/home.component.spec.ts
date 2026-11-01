import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { RecognitionStatus } from '../../models/recognition.model';
import { loadingSelector } from '../../selectors/app.selector';
import { recognitionStatusSelector } from '../../selectors/recognition.selector';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  const create = (status: RecognitionStatus, loading = false) => {
    store.overrideSelector(recognitionStatusSelector, status);
    store.overrideSelector(loadingSelector, loading);
    store.refreshState();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const has = (tag: string) => !!fixture.nativeElement.querySelector(tag);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
  });

  it('shows the welcome splash before recognition has ever started', () => {
    create(RecognitionStatus.uninitialized);
    expect(has('app-welcome-splash')).toBe(true);
    expect(has('app-recognition-render')).toBe(false);
    expect(component.hasResults()).toBe(false);
  });

  it.each([RecognitionStatus.connected, RecognitionStatus.disconnected])('shows the captions once recognition is %s, so the last results stay visible', (status) => {
    create(status);
    expect(has('app-recognition-render')).toBe(true);
    expect(has('app-welcome-splash')).toBe(false);
  });

  it('is recognising only while connected', () => {
    create(RecognitionStatus.connected);
    expect(component.isRecognizing()).toBe(true);
    fixture.destroy();
    create(RecognitionStatus.disconnected);
    expect(component.isRecognizing()).toBe(false);
  });

  it('passes on the loading state from the store', () => {
    create(RecognitionStatus.uninitialized, true);
    expect(component.loading()).toBe(true);
  });
});
