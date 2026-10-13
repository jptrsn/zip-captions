import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { defaultAppState } from '../../../../reducers/app.reducer';
import { CaptionLine } from '../../../../services/translator/caption-lines';
import { RecognizedTextComponent } from './recognized-text.component';

describe('RecognizedTextComponent', () => {
  let fixture: ComponentFixture<RecognizedTextComponent>;
  let component: RecognizedTextComponent;

  const lines = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('.recognized-text'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecognizedTextComponent],
      imports: [NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [provideMockStore({ initialState: defaultAppState })],
    });
    fixture = TestBed.createComponent(RecognizedTextComponent);
    component = fixture.componentInstance;
    component.connected = signal(true);
    component.hasLiveResults = signal(true);
    component.error = signal(undefined);
    component.renderHistory = signal(15);
  });

  it('should create', () => {
    component.textOutput = signal(['hello', 'world']);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders plain text lines without lang or dir (viewer path)', () => {
    component.textOutput = signal(['hello', 'world']);
    fixture.detectChanges();
    expect(lines().map((el) => el.textContent?.trim())).toEqual(['hello', 'world']);
    expect(lines().every((el) => !el.hasAttribute('lang') && !el.hasAttribute('dir'))).toBe(true);
  });

  it('renders lang and dir on each line, so an English line in an Arabic pane stays left to right', () => {
    component.lines = signal<CaptionLine[]>([
      { id: '1', text: 'مرحبا', lang: 'ar-SA', dir: 'rtl' },
      { id: '2', text: 'hello', lang: 'en-US', dir: 'ltr' },
    ]);
    fixture.detectChanges();
    const [arabic, english] = lines();
    expect([arabic.getAttribute('lang'), arabic.getAttribute('dir')]).toEqual(['ar-SA', 'rtl']);
    expect([english.getAttribute('lang'), english.getAttribute('dir')]).toEqual(['en-US', 'ltr']);
  });

  it('renders a placeholder for a pending line, and fills the same element when the text arrives', () => {
    const state = signal<CaptionLine[]>([
      { id: '1', text: 'uno', lang: 'es', dir: 'ltr' },
      { id: '2', text: '', lang: 'es', dir: 'ltr', pending: true },
    ]);
    component.lines = state;
    fixture.detectChanges();
    expect(lines().length).toBe(2);
    expect(lines()[1].querySelector('[data-testid="zc-line-pending"]')).not.toBeNull();
    expect(lines()[1].querySelector('[data-testid="zc-line-pending"]')?.getAttribute('aria-hidden')).toBe('true');
    const slot = lines()[1];

    state.set([
      { id: '1', text: 'uno', lang: 'es', dir: 'ltr' },
      { id: '2', text: 'dos', lang: 'es', dir: 'ltr' },
    ]);
    fixture.detectChanges();
    expect(lines()[1]).toBe(slot);
    expect(slot.textContent?.trim()).toBe('dos');
    expect(slot.querySelector('[data-testid="zc-line-pending"]')).toBeNull();
  });

  it('shows a language chip only for lines flagged as another language', () => {
    component.lines = signal<CaptionLine[]>([
      { id: '1', text: 'bonjour', lang: 'fr-CA', dir: 'ltr' },
      { id: '2', text: 'hello', lang: 'en-US', dir: 'ltr', foreignLang: 'en' },
    ]);
    fixture.detectChanges();
    expect(lines()[0].querySelector('[data-testid="zc-line-lang"]')).toBeNull();
    expect(lines()[1].querySelector('[data-testid="zc-line-lang"]')?.textContent?.trim()).toBe('en');
  });

  it('shows the same most recent segments in two panes of equal length', () => {
    component.renderHistory = signal(2);
    component.lines = signal<CaptionLine[]>(['a', 'b', 'c'].map((id) => ({ id, text: id })));
    fixture.detectChanges();
    expect(lines().map((el) => el.textContent?.trim())).toEqual(['b', 'c']);
  });
});
