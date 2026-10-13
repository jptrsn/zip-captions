import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ObsFeed } from '../../modules/settings/models/settings.model';
import { defaultAppState } from '../../reducers/app.reducer';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { selectObsConnected, selectObsStreamActive } from '../../selectors/obs.selectors';
import { selectObsFeed } from '../../selectors/settings.selector';
import { CaptionTranslationService } from '../translator/caption-translation.service';
import { ObsCaptionFeedService } from './obs-caption-feed.service';
import { ObsConnectionService } from './obs-connection.service';

@Component({ template: '' })
class HostComponent {}

describe('ObsCaptionFeedService', () => {
  let host: ComponentFixture<HostComponent>;
  let store: MockStore;
  let sendCaption: jest.Mock;
  let live: ReturnType<typeof signal<string>>;
  let translatedLive: ReturnType<typeof signal<string>>;
  let active: ReturnType<typeof signal<boolean>>;

  // Effects (which feed toObservable) run during change detection
  const flush = () => {
    host.detectChanges();
    store.refreshState();
    host.detectChanges();
  };

  const setup = (feed: ObsFeed = 'translated', connection = ObsConnectionState.connected, streaming = true) => {
    live = signal('');
    translatedLive = signal('');
    active = signal(true);
    sendCaption = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: defaultAppState }),
        { provide: ObsConnectionService, useValue: { sendCaption } },
        {
          provide: CaptionTranslationService,
          useValue: { liveText: live, translatedLive, active, target: signal('es'), sourceLanguage: signal('en-US') }
        },
      ],
    });
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectObsFeed, feed);
    store.overrideSelector(selectObsConnected, connection);
    store.overrideSelector(selectObsStreamActive, streaming);
    store.refreshState();
    host = TestBed.createComponent(HostComponent);
    const service = TestBed.inject(ObsCaptionFeedService);
    flush();
    return service;
  };

  it('sends the live line on the original feed', () => {
    setup('original');
    live.set('hello');
    translatedLive.set('hola');
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('hello');
  });

  it('sends the translation, not the source, on the translated feed', () => {
    setup('translated');
    live.set('hello');
    translatedLive.set('hola');
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('hola');
    expect(sendCaption).not.toHaveBeenCalledWith('hello');
  });

  it('sends nothing for the live line while its translation is pending', () => {
    setup('translated');
    sendCaption.mockClear();
    live.set('hello');
    flush();
    expect(sendCaption).not.toHaveBeenCalled();
  });

  it('sends the original while translation is off or unavailable', () => {
    setup('translated');
    active.set(false);
    live.set('hello');
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('hello');
  });

  it('clears OBS when the live line ends', () => {
    setup('translated');
    live.set('hello');
    translatedLive.set('hola');
    flush();
    live.set('');
    translatedLive.set('');
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('');
  });

  it('sends identical consecutive text once', () => {
    setup('original');
    live.set('hello');
    flush();
    sendCaption.mockClear();
    translatedLive.set('hola');
    flush();
    expect(sendCaption).not.toHaveBeenCalled();
  });

  it('sends nothing when OBS is not connected', () => {
    setup('original', ObsConnectionState.disconnected);
    live.set('hello');
    flush();
    expect(sendCaption).not.toHaveBeenCalled();
  });

  it('sends nothing while OBS is connected but not streaming, then sends the unchanged text once streaming starts', () => {
    setup('original', ObsConnectionState.connected, false);
    live.set('hello');
    flush();
    expect(sendCaption).not.toHaveBeenCalled();
    store.overrideSelector(selectObsStreamActive, true);
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('hello');
  });

  it('sends the same caption again after streaming stops and restarts', () => {
    setup('original');
    sendCaption.mockClear(); // setup sends the initial empty caption
    live.set('hello');
    flush();
    expect(sendCaption).toHaveBeenCalledTimes(1);
    store.overrideSelector(selectObsStreamActive, false);
    flush();
    store.overrideSelector(selectObsStreamActive, true);
    flush();
    expect(sendCaption).toHaveBeenCalledTimes(2);
    expect(sendCaption).toHaveBeenLastCalledWith('hello');
  });

  it('changes what is sent when the feed changes', () => {
    setup('original');
    live.set('hello');
    translatedLive.set('hola');
    flush();
    store.overrideSelector(selectObsFeed, 'translated');
    flush();
    expect(sendCaption).toHaveBeenLastCalledWith('hola');
  });
});
