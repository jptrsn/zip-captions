import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { CaptionSegment } from '../../../../models/caption-segment.model';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionConnectedSelector, recognitionPausedSelector } from '../../../../selectors/recognition.selector';
import { dialectSelector, languageSelector } from '../../../../selectors/settings.selector';
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { SegmentTranslation } from '../../../../services/translator/segment-translations';
import { PeerService } from '../../services/peer.service';
import { BroadcastRoomComponent } from './broadcast-room.component';

const segment = (id: string, text: string): CaptionSegment => ({ id, text, lang: 'en' });

describe('BroadcastRoomComponent', () => {
  let component: BroadcastRoomComponent;
  let fixture: ComponentFixture<BroadcastRoomComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let broadcast: jest.Mock;
  let translation: {
    active: ReturnType<typeof signal<boolean>>;
    target: ReturnType<typeof signal<string>>;
    liveText: ReturnType<typeof signal<string>>;
    translatedLive: ReturnType<typeof signal<string>>;
    segments: ReturnType<typeof signal<CaptionSegment[]>>;
    translations: ReturnType<typeof signal<Map<string, SegmentTranslation>>>;
  };

  const create = (opts: { connected?: boolean; paused?: boolean; dialect?: string; lang?: string } = {}) => {
    store.overrideSelector(recognitionConnectedSelector, opts.connected ?? true);
    store.overrideSelector(recognitionPausedSelector, opts.paused ?? false);
    store.overrideSelector(dialectSelector, (opts.dialect ?? 'unspecified') as never);
    store.overrideSelector(languageSelector, (opts.lang ?? 'en') as never);
    store.refreshState();
    fixture = TestBed.createComponent(BroadcastRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const sent = (type: string) => broadcast.mock.calls.map(([payload]) => payload).filter((p) => p.type === type);
  const lastSent = (type: string) => sent(type)[sent(type).length - 1];

  beforeEach(async () => {
    broadcast = jest.fn();
    translation = {
      active: signal(false),
      target: signal('es'),
      liveText: signal('hello'),
      translatedLive: signal(''),
      segments: signal([segment('s1', 'Hello there')]),
      translations: signal(new Map<string, SegmentTranslation>()),
    };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: CaptionTranslationService, useValue: translation },
        { provide: PeerService, useValue: { broadcastData: broadcast } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BroadcastRoomComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('starts broadcast recognition and shows the captions', () => {
    create();
    expect(dispatch).toHaveBeenCalledWith(RecognitionActions.connect({ id: 'broadcast' }));
    expect(fixture.nativeElement.querySelector('app-recognition-render')).toBeTruthy();
  });

  describe('the host language sent to viewers', () => {
    it('is the dialect when one is chosen', () => {
      create({ dialect: 'fr-CA', lang: 'fr' });
      expect(lastSent('hostLanguage')).toEqual({ type: 'hostLanguage', lang: 'fr-CA' });
    });

    it('is the language when the dialect is unspecified', () => {
      create({ dialect: 'unspecified', lang: 'de' });
      expect(lastSent('hostLanguage')).toEqual({ type: 'hostLanguage', lang: 'de' });
    });
  });

  describe('captions sent to viewers', () => {
    it('sends the live line and the final segments in the original language', () => {
      create();
      expect(lastSent('live')).toMatchObject({ recognition: 'hello', lang: 'en', translations: [] });
      expect(lastSent('live').translatedLive).toBeUndefined();
      expect(lastSent('segment')).toMatchObject({ recognition: ['Hello there'], lang: 'en', translations: [], translated: [] });
    });

    it('updates viewers as the live line changes', () => {
      create();
      translation.liveText.set('hello everyone');
      fixture.detectChanges();
      expect(lastSent('live').recognition).toBe('hello everyone');
    });

    it('offers the target language and sends the translated live line when translating', () => {
      translation.active.set(true);
      translation.translatedLive.set('hola');
      create();
      expect(lastSent('live')).toMatchObject({ recognition: 'hello', translations: ['es'], translatedLive: 'hola' });
    });

    it('sends only the translations that exist yet', () => {
      translation.active.set(true);
      translation.segments.set([segment('s1', 'Hello there'), segment('s2', 'Good morning')]);
      translation.translations.set(new Map([['s1', { lang: 'es', text: 'Hola' }]]));
      create();
      expect(lastSent('segment').translated).toEqual([{ id: 's1', text: 'Hola', lang: 'es' }]);
      expect(lastSent('segment').translations).toEqual(['es']);
    });

    it('sends no captions while recognition is not running', () => {
      create({ connected: false, paused: false });
      expect(lastSent('live')).toMatchObject({ recognition: '' });
      expect(lastSent('segment')).toMatchObject({ recognition: [], segments: [] });
    });
  });

  describe('pausing', () => {
    it('tells viewers when recognition is paused, and again when it resumes', () => {
      create({ connected: true });
      expect(sent('status')).toEqual([]);
      store.overrideSelector(recognitionConnectedSelector, false);
      store.overrideSelector(recognitionPausedSelector, true);
      store.refreshState();
      fixture.detectChanges();
      expect(sent('status')).toEqual([{ type: 'status', status: RecognitionStatus.paused }]);
      store.overrideSelector(recognitionConnectedSelector, true);
      store.overrideSelector(recognitionPausedSelector, false);
      store.refreshState();
      fixture.detectChanges();
      expect(sent('status')).toEqual([
        { type: 'status', status: RecognitionStatus.paused },
        { type: 'status', status: RecognitionStatus.connected },
      ]);
    });
  });

  describe('leaving', () => {
    it('stops the broadcast recognition when recognition is connected', () => {
      create({ connected: true });
      fixture.destroy();
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'broadcast' }));
    });

    it('does not dispatch a disconnect when recognition was not connected', () => {
      create({ connected: false });
      fixture.destroy();
      expect(dispatch).not.toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'broadcast' }));
    });
  });
});
