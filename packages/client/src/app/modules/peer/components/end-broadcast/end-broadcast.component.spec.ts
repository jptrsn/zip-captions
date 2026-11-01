import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { PeerActions } from '../../../../actions/peer.actions';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { RecognitionStatus } from '../../../../models/recognition.model';
import { recognitionStatusSelector } from '../../../../selectors/recognition.selector';
import { selectIsBroadcasting } from '../../../../selectors/peer.selectors';
import { MediaService } from '../../../media/services/media.service';
import { EndBroadcastComponent } from './end-broadcast.component';

describe('EndBroadcastComponent', () => {
  let component: EndBroadcastComponent;
  let fixture: ComponentFixture<EndBroadcastComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let closeClick: jest.SpyInstance;
  let media: { getMediaStream: jest.Mock; getVolumeForStream: jest.Mock; disconnectStream: jest.Mock };

  const create = (opts: { status?: RecognitionStatus; broadcasting?: boolean; stream?: string } = {}) => {
    media.getMediaStream.mockReturnValue(opts.stream ? of(opts.stream) : of());
    store.overrideSelector(recognitionStatusSelector, opts.status ?? RecognitionStatus.connected);
    store.overrideSelector(selectIsBroadcasting, opts.broadcasting ?? true);
    store.refreshState();
    fixture = TestBed.createComponent(EndBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // jsdom cannot submit a method="dialog" form
    closeClick = jest.spyOn(component.closeButton.nativeElement, 'click').mockImplementation(() => undefined);
  };
  const modal = () => fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
  const byId = (id: string) => fixture.nativeElement.querySelector(`[data-testid="${id}"]`) as HTMLButtonElement;

  beforeEach(async () => {
    media = {
      getMediaStream: jest.fn(),
      getVolumeForStream: jest.fn(() => signal(0.4)),
      disconnectStream: jest.fn().mockReturnValue('x'),
    };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders, { provide: MediaService, useValue: media }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EndBroadcastComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('knows recognition is active only while it is connected', () => {
    create({ status: RecognitionStatus.connected });
    expect(component.isActive()).toBe(true);
    fixture.destroy();
    create({ status: RecognitionStatus.disconnected });
    expect(component.isActive()).toBe(false);
  });

  it('shows the microphone volume while broadcasting with a stream', () => {
    create({ stream: 'mic' });
    expect(component.vol()).toBe(0.4);
    expect(media.getVolumeForStream).toHaveBeenCalledWith('mic');
  });

  it.each([
    ['not broadcasting', { broadcasting: false, stream: 'mic' }],
    ['there is no stream', { broadcasting: true, stream: undefined }],
  ])('shows no volume when %s', (_name, opts) => {
    create(opts);
    expect(component.vol()).toBe(0);
  });

  it('opens the confirmation dialog without ending anything', () => {
    create();
    byId('zc-share-end').click();
    expect(modal().hasAttribute('open')).toBe(true);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('closes the dialog and ends nothing when the user declines', () => {
    create();
    byId('zc-share-end').click();
    byId('zc-share-end-cancel').click();
    expect(closeClick).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('on confirming, stops recognition and the stream, and ends the broadcast once recognition has disconnected', () => {
    create({ stream: 'mic', status: RecognitionStatus.connected });
    byId('zc-share-end').click();
    byId('zc-share-end-confirm').click();
    expect(closeClick).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'broadcast' }));
    expect(media.disconnectStream).toHaveBeenCalledWith('mic');
    expect(dispatch).not.toHaveBeenCalledWith(PeerActions.endBroadcast());

    store.overrideSelector(recognitionStatusSelector, RecognitionStatus.disconnected);
    store.refreshState();
    expect(dispatch).toHaveBeenCalledWith(PeerActions.endBroadcast());
  });

  it('does not touch a stream when there is none', () => {
    create({ stream: undefined });
    component.endBroadcast();
    expect(media.disconnectStream).not.toHaveBeenCalled();
  });
});
