# U1 — Caption Segment Model: Functional Design

**Status:** Approved 2026-10-10, with decisions recorded in §8
**Enables:** FR-9, FR-D3, FR-B1 (via U2–U4), Release 2 conversation mode
**Constraint:** no visible UI change.

## 1. Current state (verified 2026-10-10)

| Item | Finding |
|---|---|
| Final-text history | `WritableSignal<string[]>` in `WebRecognitionService` and `AzureRecognitionService`, each capped at `MAX_RECOGNITION_LENGTH = 15` with `slice(-15)`. (Requirements §3 says Azure never trims. That is out of date, because the merged baseline added the cap.) |
| `getRecognizedText()` callers | Only `RecognitionRenderComponent` and `BroadcastRoomComponent`. OBS (`StreamCaptionsComponent`, plus the `ObsActions.sendCaption` dispatch in the Web engine) uses only **live** text. Transcripts are fed by `RecognitionActions.addTranscriptSegment` dispatched **inside** each engine. U1 leaves both of these paths unchanged. |
| Translation alignment | `RecognitionRenderComponent` calls `translateSegments(string[])` and replaces `translatedTextOutput` with the whole result array. Alignment is by array index. Results that resolve out of order can overwrite newer ones. |
| Translator | `ChromeTranslatorService` holds one `currentTranslator`. A pair change destroys it and creates a new one, and also clears `segmentCache`. |
| Azure `NoMatch` | `recognized` also fires for `ResultReason.NoMatch` with empty text (Azure STT docs, via docs-mcp). Today this appends `''` to the history and dispatches an empty transcript segment. |

## 2. Model

New file `packages/client/src/app/models/caption-segment.model.ts`:

```ts
export interface CaptionSegment {
  /** Stable, unique for the page lifetime; never derived from array position. */
  id: string;
  /** Final recognized text, exactly as currently pushed into string[]. */
  text: string;
  /** BCP 47 tag of the recognition language in effect when the segment was produced. */
  lang: string;
  /** Same value dispatched to addTranscriptSegment (may be undefined, as today). */
  start?: Date;
}
```

The segment is immutable. U2 refines `lang` by **replacing** a segment with a copy (`{ ...seg, lang }`) under the same `id`, never by mutating it.

## 3. ID strategy

A small pure helper, `CaptionSegmentHistory`, lives in the same file and is owned by each engine:

```ts
export class CaptionSegmentHistory {
  constructor(private prefix: 'w' | 'a', private max: number, private epoch = Date.now().toString(36)) {}
  private seq = 0;
  append(current: CaptionSegment[], text: string, lang: string, start?: Date): CaptionSegment[]
  // returns [...current, { id: `${prefix}-${epoch}-${seq++}`, text, lang, start }].slice(-max)
}
```

- **Assigned once, at creation.** Rollover drops the oldest *object*. Surviving objects keep their IDs, because nothing re-indexes.
- **Monotonic counter** (`seq`). It never resets during the page lifetime, including on disconnect or reconnect, so an ID is never reused while an old copy could still be referenced.
- **Engine prefix** (`w` / `a`). `fallbackToWebEngine()` can switch engines mid-session, and the prefix keeps the two engines' IDs from colliding.
- **Epoch** (base-36 time at service construction). This keeps IDs unique across page reloads, which matters once U4 sends IDs to viewers who may have stale segments from the broadcaster's previous load. `crypto.randomUUID()` was not chosen because it's unavailable in some jsdom test setups and makes tests non-deterministic. The epoch is injectable for tests.
- IDs are opaque strings. Consumers must not parse them.

## 4. How each engine creates segments

Both engines replace `recognizedText: WritableSignal<string[]>` with `recognizedSegments: WritableSignal<CaptionSegment[]>`. Every place that pushed a string now calls `history.append(...)` with the same text. The ordering, the cap and the transcript dispatches stay exactly as they are.

### 4.1 Web Speech (`WebRecognitionService`)

**Language.** `recog.lang` only takes effect on the next `start()`. A `'start'` event listener snapshots `this.recog.lang` into `sessionLang`. The initial value comes from `setLanguage()`, so it is defined before the first `start` event. Segments use `sessionLang`, which is the dialect actually in use for that recognition session, not the latest setting.

**Debounce path** (`debounce$` → `partialTranscript`):
```ts
this.recognizedSegments.update((current) => {
  if (this.transcriptionEnabled()) { dispatch addTranscriptSegment({ text, start: segmentStart }); }
  const next = this.history.append(current, partialTranscript, this.sessionLang, segmentStart);
  segmentStart = undefined;   // unchanged ordering relative to the dispatch
  return next;
});
```
The `start` value comes from `segmentStart`, captured before it is reset. That is the same value transcripts receive.

**`end` path** (`mostRecentOutput !== ''`): the in-place `current.push()` becomes `history.append(current, mostRecentOutput, this.sessionLang, segmentStart)`. That removes the mutation without changing behaviour, because `slice` already returned a new array. The transcript dispatch and the `segmentStart` reset stay where they are.

No other paths append. The `error` / `no-speech` paths only clear live text.

### 4.2 Azure (`AzureRecognitionService`)

**Language.** `initialize(language)` stores `this.recognitionLang = language`, the value assigned to `speechConfig.speechRecognitionLanguage`. That assignment is read, never changed. **No recognizer configuration changes** (FR-AZ-2). Bilingual locales such as `fr-CA` produce segments with `lang: 'fr-CA'` until U2 tags them with `LanguageDetector`.

**`recognized` event:**
```ts
this.recognizedSegments.update((current) =>
  this.history.append(current, event.result.text, this.recognitionLang, segmentStart));
```
`start` is captured before `segmentStart = undefined`, matching the transcript dispatch. The order is: append, clear live, dispatch transcript, reset `segmentStart`. That is today's order, except that `start` is now also recorded on the segment.

**`NoMatch` and empty segments are filtered (existing bug, fixed in U1 by decision, §8).** When `event.result.reason !== ResultReason.RecognizedSpeech` or the text is blank after trimming:
- no segment is appended
- no transcript segment is dispatched
- live text is still cleared and `segmentStart` is still reset, as today
- `_updateSession` (usage tracking) still runs, because it tracks session time, not text.

This removes the blank caption rows that `NoMatch` caused. It is the one intended visible change in U1.

## 5. Facade and backward compatibility

`RecognitionService`:
```ts
public getRecognizedSegments(): Signal<CaptionSegment[]>   // provider switch, same as the others
public getRecognizedText(): Signal<string[]>               // unchanged signature
```

`getRecognizedText()` derives from the segments **inside each engine**, using a `computed` created once in a field initializer:
```ts
private recognizedText: Signal<string[]> = computed(() => this.recognizedSegments().map((s) => s.text));
```
This means:
- the facade's `getRecognizedText()` body and its provider switching stay **byte-for-byte unchanged**
- each call returns the same stable `Signal` instance per engine, as it does today, so callers that wrap it in `computed()` / `toObservable()` (in constructors, keeping clear of NG0203) behave the same
- the emitted arrays contain the same strings, in the same order, capped at 15 — identical to today's output.

The engines' own `getRecognizedText()` stays public with the same signature.

**Consumers:** `BroadcastRoomComponent` is not touched. Its wire payload changes in U4, not U1. `RecognitionRenderComponent` changes internally only (§7). `RecognizedTextComponent` keeps its `Signal<string[]>` input. OBS and transcripts are not touched.

## 6. Translator cache keyed by pair (`ChromeTranslatorService`)

The single `currentTranslator`, `currentSourceLang` and `currentTargetLang` are replaced with:

```ts
private translators = new Map<string, BrowserTranslator>();        // pairKey -> translator, insertion order = LRU order
private pendingInits = new Map<string, Promise<BrowserTranslator | null>>();
private readonly MAX_TRANSLATORS = 4;
```

- **`getOrCreateTranslator(s, t, userInitiated)`:** on a cache hit, the entry is moved to most-recently-used and returned. Concurrent calls for the *same* pair share one promise, and different pairs can initialise at the same time. Translators for other pairs are no longer destroyed on a pair change. Unsupported pairs, the user-activation gate and the error handling are unchanged.
- **Race fixed during implementation:** the baseline registered the pending promise only *after* `await canTranslate()`, so two concurrent callers for the same pair both created a translator. The pending entry is now registered before the first `await`. A user-initiated request never joins a background request that would skip the download.
- **Eviction:** when an insert would exceed `MAX_TRANSLATORS`, the least-recently-used translator is `destroy()`ed. Four entries covers U2 (en→X and fr→X for a bilingual locale), a viewer-side fallback, and one recent pair to switch back to. Chrome's guidance ("Destroy unused sessions") supports keeping the cache bounded.
- **`downloadModel()`** stores its translator in the cache under the pair, using the same LRU insert. If that pair is already cached, it reuses the cached translator and still emits `modelReady$`.
- **`segmentCache` is session-scoped (decision, §8).** It holds translated text only for the current recognition session, in memory.
  - Its keys already include the pair (`s->t:text`), so it is no longer cleared every time a translator is created.
  - It is bounded at **500 entries**, evicting the oldest first.
  - New public `clearSessionCache()` empties it. It is called when the broadcaster's recognition session ends (`RecognitionActions.disconnect`, a non-dispatching effect in `RecognitionEffects`) and when a viewer leaves a broadcast (`BroadcastRenderComponent.ngOnDestroy`). Translations from earlier sessions are never retained.
  - Translator instances (downloaded models, no text) persist across sessions.
  - `destroy()` clears both caches.
- **`destroy()`** destroys every cached translator and clears both caches.
- **Public API unchanged:** same method names, signatures and signals. `modelStatus`, `downloadProgress` and `lastError` keep their current meaning: they reflect the most recent check, create or download call. Per-pair status signals are left for U3/U4, if the UI needs them.
- **Translations still run one at a time inside Chrome** ("Translations are processed sequentially", per the Chrome Translator API docs). Multiple translators don't add parallelism. They avoid re-creation costs and the races that came with them.

## 7. Translations keyed by segment ID (`RecognitionRenderComponent`)

This is doable without UI changes. The component's public `translatedTextOutput` stays a `Signal<string[]>`, but it becomes a derived value:

```ts
private segments = computed(() => id() ? this.recognitionService.getRecognizedSegments()() : []);
private translationsById: WritableSignal<Map<string, string>> = signal(new Map());   // for current pair
public translatedTextOutput: Signal<string[]> = computed(() =>
  this.segments().filter((s) => this.translationsById().has(s.id)).map((s) => this.translationsById().get(s.id)!));
```

- When segments change, the component translates only segments whose IDs have no translation yet, then merges each result into `translationsById`. Merges are keyed by ID, so a late result can no longer overwrite newer ones. Entries for IDs no longer in `segments()` are pruned.
- A change of pair (settings change or `modelReady$`) clears the map and re-translates the current segments. That is the same set of segments translated today.
- On a reset, the previous translations stay visible until the new ones arrive. Today the old array also stays until it is replaced, so the pane never goes blank.
- **Pending segments are omitted, not shown as placeholders.** That matches today's visible behaviour, where nothing shows until the translation resolves. FR-D3 placeholders are **U3**.
- `textOutput` stays `computed(... getRecognizedText()())`, so the original pane is unchanged.
- The `toObservable` calls stay in the constructor.
- Source language stays the global `sourceLanguage()` in U1. Per-segment `seg.lang` as the source is **U2** (FR-9).

**`BroadcastRenderComponent` (viewer):** it receives a `string[]` with no IDs from the peer payload, so it keeps index alignment. **Noted for U4**, where the versioned payload carries `{ id, text, lang }`.

## 8. Decisions (approved 2026-10-10)

1. **Azure `NoMatch` / empty segments: filter them now.** This is an existing bug (§4.2).
2. **Translation cache:** translations are kept in memory for the current session only. Earlier sessions' translations are not retained (§6).
3. **Limits:** `MAX_TRANSLATORS = 4` and `segmentCache` = 500, as proposed.

## 9. Test plan

New and extended specs. All use mocked engines and adapters; nothing touches real browser or Azure globals.

| Spec | Cases |
|---|---|
| `models/caption-segment.model.spec.ts` (new) | Appending 20 segments keeps the last 15. **The IDs of surviving segments are unchanged after each rollover.** All IDs are unique. Engine prefixes differ. Same epoch and prefix give a deterministic sequence. `start` and `lang` are carried through. |
| `web-recognition.service.spec.ts` (new) | Stubs a global `webkitSpeechRecognition` with a fake `EventTarget`, plus a MockStore. Fires `start` and then `end` with live output: a segment is appended with `lang` set to the `recog.lang` captured at `start`. Calls `setLanguage()` mid-session: existing segments keep their language, and only segments after the next `start` get the new one. Runs 16+ `end` cycles: IDs stay stable across rollover. Checks that `getRecognizedText()` equals `segments.map(text)`. One debounce-path case uses `jest` fake timers. |
| `azure-recognition.service.spec.ts` (new) | `HttpClientTestingModule` and MockStore. Attaches a fake recognizer and invokes `recognized` handlers: each one appends a segment with `lang` = the initialised locale. Checks rollover ID stability. Empty or `NoMatch` results append nothing and dispatch no transcript segment. **Regression:** after `initialize('fr-CA')`, `speechConfig.speechRecognitionLanguage === 'fr-CA'`, and no auto-detect or LID config is used (the `sdk` module is mocked). |
| `recognition.service.spec.ts` (extended) | Uses stub engines. `getRecognizedSegments()` and `getRecognizedText()` follow the provider. **The compatibility path:** `getRecognizedText()()` deep-equals the segment texts, in order, for both engines, and returns the same `Signal` instance on repeated calls. |
| `chrome-translator.service.spec.ts` (extended) | Switching en→fr, then en→es, then back to en→fr creates only 2 translators and destroys none. Concurrent calls for one pair share a single `create`. Concurrent calls for different pairs each create their own. A 5th pair evicts and `destroy()`s the LRU translator. `downloadModel()` populates the cache. `destroy()` destroys all translators. The segment cache stays at or below 500 entries. `clearSessionCache()` forces re-translation but keeps translators. Existing cases still pass. |
| `services/translator/segment-translations.spec.ts` (new) | Pure helpers `alignTranslations` and `mergeTranslations`, used by `recognition-render`. Out-of-order results attach to the right segment. Alignment holds across rollover. A pending segment is omitted. Translations for segments that have rolled out are dropped. (`recognition-render.component.spec.ts` still fails on the existing test-setup problems, so the logic is tested through these helpers.) |

**Pass criteria:** `npx jest -c packages/client/jest.config.ts --ci --forceExit` shows no new failing suites compared with the baseline of 46, and `npx tsc -p packages/client/tsconfig.app.json --noEmit` is clean.

## 10. Out of scope (later units)

- Per-segment source language for translation and `LanguageDetector` tagging (U2).
- Placeholders and orientation (U3).
- Broadcast payload IDs and viewer ID alignment (U4).
- Per-pair status signals.
- Transcripts storing `lang` (FR-T1, after U2).
