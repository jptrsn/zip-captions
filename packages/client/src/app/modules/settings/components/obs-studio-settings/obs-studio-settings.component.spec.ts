import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { ObsActions } from '../../../../actions/obs.actions';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { selectObsConnected, selectObsError, selectObsStreamActive } from '../../../../selectors/obs.selectors';
import { selectObsFeed } from '../../../../selectors/settings.selector';
import { CaptionTranslationService } from '../../../../services/translator/caption-translation.service';
import { ObsFeed, SettingsActions } from '../../models/settings.model';
import { ObsStudioSettingsComponent } from './obs-studio-settings.component';

describe('ObsStudioSettingsComponent', () => {
  let component: ObsStudioSettingsComponent;
  let fixture: ComponentFixture<ObsStudioSettingsComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let translation: { active: ReturnType<typeof signal<boolean>>; sourceLanguage: ReturnType<typeof signal<string>>; target: ReturnType<typeof signal<string>> };

  const create = (opts: { feed?: ObsFeed; connection?: ObsConnectionState } = {}) => {
    store.overrideSelector(selectObsFeed, opts.feed ?? 'original');
    store.overrideSelector(selectObsConnected, opts.connection ?? ObsConnectionState.disconnected);
    store.overrideSelector(selectObsError, undefined);
    store.overrideSelector(selectObsStreamActive, false);
    store.refreshState();
    fixture = TestBed.createComponent(ObsStudioSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const byId = (id: string) => fixture.nativeElement.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  beforeEach(async () => {
    // The real service needs the speech recogniser and the Translator API
    translation = { active: signal(false), sourceLanguage: signal('en'), target: signal('es') };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      declarations: [ObsStudioSettingsComponent],
      providers: [...TestingModuleProviders, { provide: CaptionTranslationService, useValue: translation }],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  describe('connection', () => {
    it('connects with the entered address, filling in the default port', () => {
      create();
      component.formGroup.patchValue({ ip: '192.168.1.5', password: 'secret' });
      component.saveObsWebsocket();
      expect(dispatch).toHaveBeenCalledWith(ObsActions.connect({ ip: '192.168.1.5', port: 4455, password: 'secret' }));
    });

    it('defaults to the local address', () => {
      create();
      component.saveObsWebsocket();
      expect(dispatch).toHaveBeenCalledWith(ObsActions.connect({ ip: '127.0.0.1', port: 4455, password: null }));
    });

    it('offers Connect while disconnected and Disconnect while connected', () => {
      create();
      expect(byId('zc-obs-connect')).toBeTruthy();
      expect(byId('zc-obs-disconnect')).toBeFalsy();
      fixture.destroy();
      create({ connection: ObsConnectionState.connected });
      expect(byId('zc-obs-connect')).toBeFalsy();
      expect(byId('zc-obs-disconnect')).toBeTruthy();
    });

    it('disconnects', () => {
      create({ connection: ObsConnectionState.connected });
      component.disconnect();
      expect(dispatch).toHaveBeenCalledWith(ObsActions.disconnect());
    });

    it('disables the buttons while connecting', () => {
      create({ connection: ObsConnectionState.connecting });
      expect((byId('zc-obs-connect') as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('caption source', () => {
    it('checks the current feed', () => {
      create({ feed: 'translated' });
      expect((byId('zc-obs-feed-translated') as HTMLInputElement).checked).toBe(true);
      expect((byId('zc-obs-feed-original') as HTMLInputElement).checked).toBe(false);
    });

    it.each<ObsFeed>(['original', 'translated'])('dispatches the %s feed when it is chosen', (feed) => {
      create({ feed: feed === 'original' ? 'translated' : 'original' });
      byId(`zc-obs-feed-${feed}`)!.dispatchEvent(new Event('change'));
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.setObsFeed({ feed }));
    });

    it('shows no hint for the original feed', () => {
      create({ feed: 'original' });
      expect(byId('zc-obs-feed-fallback-hint')).toBeFalsy();
    });

    it('says OBS gets the original captions when the translated feed is chosen but nothing is translating', () => {
      translation.active.set(false);
      create({ feed: 'translated' });
      expect(byId('zc-obs-feed-fallback-hint')).toBeTruthy();
    });

    it('drops that hint while translation is active', () => {
      translation.active.set(true);
      create({ feed: 'translated' });
      expect(byId('zc-obs-feed-fallback-hint')).toBeFalsy();
    });

    it('warns when OBS would be sent a language CEA-608 cannot show', () => {
      translation.active.set(true);
      translation.target.set('ar');
      create({ feed: 'translated' });
      expect(byId('zc-obs-feed-language-hint')).toBeTruthy();
    });

    it('does not warn for a Latin-script language', () => {
      translation.active.set(true);
      translation.target.set('es');
      create({ feed: 'translated' });
      expect(byId('zc-obs-feed-language-hint')).toBeFalsy();
    });

    it('judges the spoken language on the original feed', () => {
      translation.sourceLanguage.set('zh');
      create({ feed: 'original' });
      expect(byId('zc-obs-feed-language-hint')).toBeTruthy();
    });
  });
});
