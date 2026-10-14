import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TimeagoModule } from 'ngx-timeago';
import { SharedUiModule, Transcript, TranscriptTextSegment } from 'shared-ui';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { TranscriptionService } from '../../../media/services/transcription.service';
import { ViewTranscriptComponent } from './view-transcript.component';

const start = new Date('2026-01-01T10:00:00.000Z');
const at = (ms: number) => new Date(start.getTime() + ms);
const segment = (id: number, text: string, from: number, to: number): TranscriptTextSegment => ({ id, userIdHash: 'h', transcriptId: 7, text, start: at(from), end: at(to) });

describe('ViewTranscriptComponent', () => {
  let component: ViewTranscriptComponent;
  let fixture: ComponentFixture<ViewTranscriptComponent>;
  let service: Record<string, jest.Mock>;
  let transcript: Transcript;
  let blobs: Blob[];
  let click: jest.SpyInstance;
  let anchor: HTMLAnchorElement | undefined;

  const create = () => {
    fixture = TestBed.createComponent(ViewTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    transcript = { id: 7, userIdHash: 'h', title: 'Sunday', description: 'Notes', start, end: at(5000) };
    service = {
      listTranscriptSegments: jest.fn(() => of([segment(1, 'Hello', 0, 1500), segment(2, 'World', 2000, 5000)])),
      getTranscriptById: jest.fn(() => of(transcript)),
      updateTranscript: jest.fn().mockResolvedValue(undefined),
      updateTranscriptSegment: jest.fn().mockResolvedValue(undefined),
    };
    blobs = [];
    URL.createObjectURL = jest.fn((b: Blob) => { blobs.push(b); return 'blob:test'; });
    click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) { anchor = this; });
    await TestBed.configureTestingModule({
      providers: [
        ...TestingModuleProviders,
        { provide: TranscriptionService, useValue: service },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '7' } } } },
      ],
      imports: [...TestingModuleImports, SharedUiModule, TimeagoModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewTranscriptComponent],
    }).compileComponents();
  });

  afterEach(() => { click.mockRestore(); anchor = undefined; });

  // jsdom's Blob has no text()
  const downloaded = (): Promise<string> => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(blobs[blobs.length - 1]);
  });

  it('loads the transcript and segments for the id in the route', () => {
    create();
    expect(service['listTranscriptSegments']).toHaveBeenCalledWith(7);
    expect(service['getTranscriptById']).toHaveBeenCalledWith(7);
    expect(component.transcriptGroup.getRawValue()).toEqual({ id: 7, title: 'Sunday', description: 'Notes' });
  });

  it('keeps the forms read-only until edit mode is switched on, and again after it is switched off', () => {
    create();
    expect(component.transcriptGroup.disabled).toBe(true);
    component.toggleEditMode();
    expect(component.editMode()).toBe(true);
    expect(component.transcriptGroup.enabled).toBe(true);
    expect(component.segmentGroup.enabled).toBe(true);
    component.toggleEditMode();
    expect(component.transcriptGroup.disabled).toBe(true);
  });

  it('fills the end time from the last segment when the transcript has none', () => {
    transcript.end = undefined;
    create();
    expect(service['updateTranscript']).toHaveBeenCalledWith(7, { end: at(5000) });
  });

  it('does not touch the end time when the transcript already has one', () => {
    create();
    expect(service['updateTranscript']).not.toHaveBeenCalled();
  });

  it('only opens the segment editor in edit mode', () => {
    create();
    const modal = { showModal: jest.fn() } as unknown as HTMLDialogElement;
    component.editSegment(segment(1, 'Hello', 0, 1500), modal);
    expect(modal.showModal).not.toHaveBeenCalled();
    component.toggleEditMode();
    component.editSegment(segment(1, 'Hello', 0, 1500), modal);
    expect(modal.showModal).toHaveBeenCalled();
    expect(component.segmentGroup.getRawValue()).toEqual({ id: 1, text: 'Hello' });
  });

  it('saves edited segment text', async () => {
    create();
    component.toggleEditMode();
    component.segmentGroup.setValue({ id: 2, text: 'Planet' });
    component.updateTranscriptSegmentText();
    expect(service['updateTranscriptSegment']).toHaveBeenCalledWith(2, { text: 'Planet' });
  });

  it('downloads plain text with title, description and one line per segment', async () => {
    create();
    component.download('txt');
    expect(await downloaded()).toBe('Sunday\r\n\r\nNotes\r\n\r\nHello\r\nWorld\r\n');
    expect(anchor?.getAttribute('download')).toBe('Sunday.txt');
  });

  it('downloads SRT with numbered cues and comma milliseconds, relative to the start', async () => {
    create();
    component.download('srt');
    expect(await downloaded()).toBe('1\r\n00:00:00,000 --> 00:00:01,500\r\nHello\r\n\r\n2\r\n00:00:02,000 --> 00:00:05,000\r\nWorld\r\n\r\n');
    expect(anchor?.getAttribute('download')).toBe('Sunday.srt');
  });

  it('downloads VTT with a title line and dot milliseconds', async () => {
    create();
    component.download('vtt');
    expect(await downloaded()).toBe('Sunday\r\n\r\n1\r\n00:00:00.000 --> 00:00:01.500\r\nHello\r\n\r\n2\r\n00:00:02.000 --> 00:00:05.000\r\nWorld\r\n\r\n');
    expect(blobs[0].type).toBe('text/vtt;charset=utf-8');
  });
});
