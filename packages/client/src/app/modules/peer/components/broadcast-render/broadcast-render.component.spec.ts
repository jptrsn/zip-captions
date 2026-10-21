import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BroadcastRenderComponent } from './broadcast-render.component';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { RecognizedLiveTextComponent } from '../../../media/components/recognized-live-text/recognized-live-text.component';
import { RecognizedTextComponent } from '../../../media/components/recognized-text/recognized-text.component';
import { RecognitionControlSidebarComponent } from '../../../media/components/recognition-control-sidebar/recognition-control-sidebar.component';
import { FlowDirectionComponent } from '../../../media/components/flow-direction/flow-direction.component';
import { FullScreenComponent } from '../../../media/components/full-screen/full-screen.component';
import { CaptionPanesComponent } from '../../../media/components/caption-panes/caption-panes.component';
import { SettingsActions } from '../../../settings/models/settings.model';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { ChromeTranslatorService } from '../../../../services/translator/chrome-translator.service';
import { PeerService } from '../../services/peer.service';
import { buildSegmentPayload, parseSegmentPayload } from '../../models/broadcast-payload';

describe('BroadcastRenderComponent', () => {
  let component: BroadcastRenderComponent;
  let fixture: ComponentFixture<BroadcastRenderComponent>;
  let peer: PeerService;
  let store: MockStore;

  const stateWith = (translation: object) => ({
    ...defaultAppState,
    settings: { ...defaultAppState.settings, translation: { ...defaultAppState.settings.translation, ...translation } },
  });

  const create = async (translation: object) => {
    await TestBed.configureTestingModule({
      imports: TestingModuleImports,
      declarations: [
        BroadcastRenderComponent,
        CaptionPanesComponent,
        RecognizedLiveTextComponent,
        RecognizedTextComponent,
        RecognitionControlSidebarComponent,
        FlowDirectionComponent,
        FullScreenComponent,
      ],
      providers: [...TestingModuleProviders, provideMockStore({ initialState: stateWith(translation) })]
    }).compileComponents();

    peer = TestBed.inject(PeerService);
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BroadcastRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  /** Receives a broadcaster message the way PeerService does */
  const receive = (data: any) => {
    const parsed = parseSegmentPayload(data, 'en-US');
    peer.textOutput$.next(data.recognition);
    peer.segments$.next(parsed.segments);
    peer.broadcasterTranslations$.next(parsed.translated);
    peer.offeredLanguages$.next(parsed.offered);
    fixture.detectChanges();
  };

  const lines = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('.recognized-text'));
  const panes = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('[role="region"]'));

  it('should create', async () => {
    await create({});
    expect(component).toBeTruthy();
  });

  describe('on a device that cannot translate', () => {
    const english = [
      { id: 'a', text: 'hello', lang: 'en-US' },
      { id: 'b', text: 'world', lang: 'en-US' },
    ];

    it('shows the broadcaster\'s translation for the language the viewer chose', async () => {
      await create({ enabled: true, mode: 'translated-only', targetLanguage: 'fr' });
      const spy = jest.spyOn(TestBed.inject(ChromeTranslatorService), 'translateSegmentsStrict');

      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }, { id: 'b', text: 'monde', lang: 'fr' }]));

      expect(component.translationSource()).toBe('broadcaster');
      expect(lines().map((el) => el.textContent?.trim())).toEqual(['bonjour', 'monde']);
      expect(lines().every((el) => el.getAttribute('lang') === 'fr')).toBe(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('shows a placeholder for a segment the broadcaster has not translated yet, and fills it when it arrives', async () => {
      await create({ enabled: true, mode: 'translated-only', targetLanguage: 'fr' });
      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }]));
      expect(lines().length).toBe(2);
      expect(lines()[1].querySelector('[data-testid="zc-line-pending"]')).not.toBeNull();
      const slot = lines()[1];

      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }, { id: 'b', text: 'monde', lang: 'fr' }]));
      expect(lines()[1]).toBe(slot);
      expect(slot.textContent?.trim()).toBe('monde');
    });

    it('shows both panes in split mode, in the saved order and orientation', async () => {
      await create({ enabled: true, mode: 'split', targetLanguage: 'fr', paneOrder: 'translated-first', splitOrientation: 'horizontal' });
      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }, { id: 'b', text: 'monde', lang: 'fr' }]));
      const [first, second] = panes();
      expect(first.textContent).toContain('bonjour');
      expect(second.textContent).toContain('hello');
      expect(first.getAttribute('aria-label')).not.toBe(second.getAttribute('aria-label'));
      expect(fixture.nativeElement.querySelector('[data-testid="zc-split"]').classList).toContain('flex-row');
    });

    it('moves to a language the broadcaster sends when the saved one is not offered', async () => {
      await create({ enabled: true, mode: 'split', targetLanguage: 'es' });
      const dispatch = jest.spyOn(store, 'dispatch');
      receive(buildSegmentPayload(english, 'en-US', ['fr'], []));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'fr' }));
    });

    it('shows only the original from a broadcaster that is not translating', async () => {
      await create({ enabled: true, mode: 'split', targetLanguage: 'fr' });
      receive(buildSegmentPayload(english, 'en-US'));
      expect(component.translationSource()).toBe('none');
      expect(component.captionView()).toBe('original');
      expect(lines().map((el) => el.textContent?.trim())).toEqual(['hello', 'world']);
    });

    it('starts a new viewer on the broadcaster\'s language', async () => {
      await create({ enabled: false, mode: 'off', targetLanguage: 'es' });
      const dispatch = jest.spyOn(store, 'dispatch');
      receive(buildSegmentPayload(english, 'en-US', ['fr'], []));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'fr' }));
    });

    it('shows a "show translation" button while a translation is offered but hidden, and turns it on when clicked', async () => {
      await create({ enabled: false, mode: 'off', targetLanguage: 'fr' });
      const button = () => fixture.nativeElement.querySelector('[data-testid="zc-viewer-show-translation"]') as HTMLElement | null;
      expect(button()).toBeNull();

      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }]));
      expect(button()).not.toBeNull();
      expect(button()?.textContent).toContain('FR');

      const dispatch = jest.spyOn(store, 'dispatch');
      button()!.click();
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'fr' }));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setTranslationMode({ mode: 'split' }));
    });

    it('has no "show translation" button when the broadcaster is not translating, or the translation is already shown', async () => {
      await create({ enabled: true, mode: 'split', targetLanguage: 'fr' });
      receive(buildSegmentPayload(english, 'en-US', ['fr'], [{ id: 'a', text: 'bonjour', lang: 'fr' }]));
      expect(fixture.nativeElement.querySelector('[data-testid="zc-viewer-show-translation"]')).toBeNull();
    });

    it('still works with a broadcaster that predates the new payload', async () => {
      await create({ enabled: true, mode: 'split', targetLanguage: 'fr' });
      receive({ type: 'segment', recognition: ['hello', 'world'], lang: 'en-US' });
      expect(component.captionView()).toBe('original');
      expect(lines().map((el) => el.textContent?.trim())).toEqual(['hello', 'world']);
    });
  });
});
