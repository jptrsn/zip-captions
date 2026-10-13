# U3 — Split Orientation, Pane Swap & PiP Content: Functional Design

**Status:** v1, all ten decisions approved 2026-10-10 with the recommendations as written (§10). Implemented; deviations in §14.
**Covers:** FR-6, FR-D1–D4, FR-W1 · US-C1–C3, US-W1
**Not in scope:** broadcast payload and viewer ID alignment (U4), per-language windows (U5), OBS (U6), draggable divider (US-C4).

## 1. Current state (read from code, 2026-10-10)

| Item | Finding |
|---|---|
| Split layout | `recognition-render.component.html` renders `split` as two stacked panes (original on top, translated below). There is no orientation or order setting. |
| Existing label | `SETTINGS.TRANSLATION.modeSplit` is "Horizontal Split (Bilingual)" and describes the **stacked** layout. FR-D2 and US-C2 define *horizontal* as side-by-side and *vertical* as stacked, so the current label contradicts the spec. |
| Display modes | `TranslationDisplayMode = 'off' \| 'split' \| 'translated-only'`. There is no original-only mode, because `off` is the original. |
| PiP | `effectiveTranslationMode` returns `'translated-only'` whenever PiP is active and mode ≠ `off`. |
| Pending segments | `alignTranslations` **omits** segments with no translation yet. The translated pane therefore has fewer lines than the original pane, and a late translation appears at the bottom rather than in its slot. |
| Latent misalignment | `app-recognized-text` slices the last `renderHistory` items from each array separately. If the translated array is shorter, the two panes show different segments. Equal-length line lists (§5) fix this as a side effect. |
| `app-recognized-text` | `textOutput: Signal<string[]>` is required. It renders `{{text}}` in an `*ngFor` with no `trackBy`. Strings track by identity. |
| `lang`/`dir` | Set on the pane container only (`sourceLanguage()` / `targetLanguage()`). Per-segment `lang` exists (U1/U2) but is not rendered. |
| Language labels | `originalLanguageLabel` is the base code of the current spoken language. `targetLanguageLabel` is the target code. Both are global. |
| Controls | The target select and language-swap button sit inside the caption container (so they move into the PiP window). The sidebar (`app-recognition-control-sidebar`) is **not** in the PiP window. |
| Viewer | `peer/components/broadcast-render/broadcast-render.component.html` duplicates the stacked split markup, with `translationMode()` directly and no PiP. It is index-aligned from a `string[]` payload. |
| Persistence | `translation` (a `TranslationSettings` object) is written whole by `saveTranslationSettings$` on a fixed list of actions. `_applySettingsToDefault` merges stored translation settings over defaults, so new fields with defaults are safe for existing users. `translation` is part of `SyncableSettings`. |

## 2. Settings model and persistence

Three new **optional** fields on `TranslationSettings`. They are optional because synced and stored settings from before U3 don't have them; selectors supply the defaults. That avoids touching every `TranslationSettings` literal in specs and fixtures.

```ts
export type SplitOrientation = 'vertical' | 'horizontal';   // vertical = stacked, horizontal = side by side (FR-D2)
export type PaneOrder = 'original-first' | 'translated-first';
export type PipContent = 'original' | 'translated' | 'split';

interface TranslationSettings {
  // existing: enabled, mode, targetLanguage, dialectByLanguage
  splitOrientation?: SplitOrientation;  // default 'vertical' (today's layout)
  paneOrder?: PaneOrder;                // default 'original-first' (today's layout)
  pipContent?: PipContent;              // default 'translated' (FR-W1)
}
```

- `TranslationDisplayMode` is unchanged.
- **"First"** means the start side in side-by-side (logical, so it follows the interface direction) and the top in stacked.
- `defaultSettingsState.translation` gets the three defaults, so new users and `_applySettingsToDefault` both resolve them.
- **Actions** (distinct from U2's `swapTranslationLanguages`):

| Action | Reducer |
|---|---|
| `setSplitOrientation({ orientation })` | sets `splitOrientation` |
| `swapCaptionPanes()` | toggles `paneOrder`. Touches no languages. |
| `setPipContent({ content })` | sets `pipContent` |

- **Persistence:** the three actions are added to the `ofType(...)` list of `saveTranslationSettings$`, which already writes the whole `translation` object. `saveTranslationSettings({ translation })` also accepts the new fields (Partial), so the settings form can save them in one dispatch.
- **Selectors:** `selectSplitOrientation`, `selectPaneOrder`, `selectPipContent`, each with the default fallback.
- **Server sync:** `translation` rides in `SyncableSettings`. The server UI-settings schema must accept the new fields. I haven't read the schema yet; the implementation step checks it and adds props if it's strict (as it was for `uiLanguage`).

## 3. Resolving what to show

A pure helper in `services/translator/caption-view.ts` decides the view, so it can be tested without a component.

```ts
export type CaptionView = 'original' | 'translated' | 'split';

resolveCaptionView(mode, pipActive, pipContent): CaptionView
  mode === 'off'                      → 'original'          (PiP too: nothing to translate)
  pipActive                           → pipContent
  mode === 'split'                    → 'split'
  mode === 'translated-only'          → 'translated'
```

`effectiveTranslationMode` is replaced by `captionView`. Everything in the template and the live-text/hint logic keys off `captionView()`, not off the raw mode.

## 4. Layout

One pane template, rendered once or twice. Today the split and single-pane markup are two near-copies. U3 collapses them into one `app-caption-panes` presentational component so orientation and order live in one place.

| View | Layout |
|---|---|
| `original` | One pane, original lines, spoken-language label. |
| `translated` | One pane, translated lines, target-language label plus the target select and language-swap controls. |
| `split`, `vertical` | `flex-col`. Panes in `paneOrder`. Divider is a bottom border on the first pane. |
| `split`, `horizontal` | `flex-row`. Panes in `paneOrder` (logical start first). Divider is an inline-end border on the first pane. |

- **Same in full-screen and PiP.** The component sizes to its container, so the PiP window (opened at 640×320, user-resizable) gets the same layout from the same settings (FR-D4). No automatic orientation switch for PiP; the user can resize or flip it.
- **Text flow** (`bottom-up`/`top-down`) stays inside each pane, unchanged.
- **DOM order follows visual order**, so tab and screen-reader order match what's on screen after a pane swap. The pane order is applied by ordering the rendered panes, not with CSS `order`.
- **Controls stay on the translated pane** (target select, language swap, download button and progress), wherever it is in the layout. They are projected into the translated pane through a content slot.
- **Divider control cluster** (new): two small buttons centred on the boundary between the panes, visible only in `split`, fading with `controlsVisible` like the other overlays. They are **orientation toggle** and **pane swap**. The cluster is inside the caption container, so it moves into the PiP window and works there, where the sidebar can't be reached.
- **Pane regions:** each pane is `role="region"` with an `aria-label` from the new strings (NFR-4).
- **Viewer (`broadcast-render`):** untouched in U3 (decision 9). `app-caption-panes` is written so the viewer can adopt it in U4.

## 5. Placeholders and alignment (FR-D3, US-C3, US-B1)

**Interpretation:** alignment means *slot-per-segment*. The translated pane shows exactly one line for each segment, in segment order, so line N in each pane is the same segment and a translation lands in its own slot instead of being appended at the bottom. It does not mean equal row heights across the two panes. Translations wrap differently and the panes scroll independently, so a shared row grid would fight the text-flow and PiP behaviour (decision 4).

```ts
export interface CaptionLine {
  id: string;                  // segment ID; stable across translation arrival
  text: string;
  lang?: string;               // BCP 47, omitted when unknown (viewer, plain strings)
  dir?: 'ltr' | 'rtl';
  pending?: boolean;           // translation not available yet
  foreignLang?: string;        // set when the line's language differs from the pane label (§7)
}
```

Pure helpers in `caption-lines.ts` (new, next to `segment-translations.ts`):

- `buildOriginalLines(segments, spokenLang)` → one line per segment.
- `buildTranslatedLines(segments, translations, targetLang)` → one line per segment. A segment with no translation yields `{ id, text: '', pending: true, lang: target, dir }`.

Rendering:
- A pending line is a placeholder element in the same line slot, using the pane's text size and line height: a muted ellipsis "…" that pulses, with `aria-hidden="true"`. Under `prefers-reduced-motion` it is static.
- `app-recognized-text` tracks lines by `id`. When the translation arrives the same element changes its text, so there's no remove/re-add, no re-animation, and nothing shifts.
- Placeholders show in **every** translated pane, including translated-only (US-B1: "a neutral placeholder"), and never when translation is off.
- **Pass-through resolves immediately.** `planTranslations` already marks groups whose source equals the target. `translatePendingSegments` stores those translations synchronously, so a segment already in the target language never flashes a placeholder.
- **Segments that never translate** (model not downloaded, failed translation) keep their placeholder. The existing download button and progress remain the call to action, and the existing retries (model ready, settings change) fill the slots. The translated pane never shows original-language text as a fallback.
- `hasTranslatedResults` (which drives the "Start speaking…" hint in the translated pane) becomes "there are segments or translated live text", since placeholder lines now exist from the first segment.
- Because both line lists have the same length, `renderHistory` slicing now picks the same segments in both panes.

## 6. Per-line `lang` / `dir` (FR-6, US-C1)

- Each rendered line carries `[attr.lang]` and `[attr.dir]`.
  - **Original pane:** the segment's own `lang`, with `dir = textDirection(lang)`.
  - **Translated pane:** the target language and its direction. A pass-through segment is already in the target language, so the same applies.
- The pane container keeps `lang`/`dir` for the pane's **current** language, which sets the pane's alignment and label side. A line's own `dir` overrides it, so an English line inside an Arabic-spoken pane renders left-to-right while Arabic lines stay right-to-left.
- **`app-recognized-text` API change** (backward compatible):
  - new `@Input() lines?: Signal<CaptionLine[]>`
  - `textOutput` becomes optional. When only `textOutput` is given (the viewer), it maps to lines with `id = text` and no `lang`/`dir`, so rendering stays as it is today.
  - `trackBy` returns `line.id`.
- `textDirection` already exists (`services/translator/text-direction.ts`). No new direction logic.

## 7. Language labels

- **Pane label = the pane's current language.** Original pane: the current spoken language (as today). Translated pane: the current target (as today).
- **After a language swap (U2)**, older lines can be in another language. Rather than leaving them unmarked under a label that no longer fits, the **original pane** shows a small language chip (for example `FR`) on any line whose base language differs from the pane's label. This also marks the English lines of a bilingual locale (`fr-CA`, `es-US`, `ar-*`) when Azure reports them. It is cheap because every line already has `lang`.
- The **translated pane never shows chips.** After a swap, `translatePendingSegments(true)` re-translates the whole history to the new target, and segments already in that language pass through, so every translated line is in the label's language.
- Chip text is the uppercase base code, and the chip has `aria-hidden` because the line already has `lang`.
- Labels keep today's fade with `controlsVisible`. The pane `aria-label` (§4) gives the persistent accessible name.

## 8. PiP content setting (FR-W1, US-W1)

- `pipContent: 'original' | 'translated' | 'split'`, default `'translated'`, which matches the translated-only behaviour users have now.
- It applies only while PiP is active **and** translation is on. With translation off, PiP shows original captions, as today.
- It is independent of the in-window `mode`. A user in the in-window `split` mode can have PiP show only `translated`, and the reverse.
- `split` in PiP uses the same orientation and pane order as the main window.
- **Where to set it:**
  - Translation settings form: a "Picture-in-Picture shows" radio group, shown only when PiP is supported.
  - Sidebar translation menu: the same three-way control, shown only when PiP is supported.
  - Both dispatch `setPipContent`. The form saves it with the rest of its fields.
- The live PiP window updates immediately when the setting changes, because `captionView` is a computed signal.

## 9. New i18n strings

Added to `en.json` first, one sentence per key. Other locales are generated with `cd scripts && python3 translate.py`, never by hand, and each locale file keeps its trailing newline.

| Key | English |
|---|---|
| `SETTINGS.TRANSLATION.splitOrientation` | Split orientation |
| `SETTINGS.TRANSLATION.orientationSideBySide` | Side by side |
| `SETTINGS.TRANSLATION.orientationStacked` | Stacked |
| `SETTINGS.TRANSLATION.swapPanes` | Swap the original and translated panes |
| `SETTINGS.TRANSLATION.paneOriginal` | Original captions |
| `SETTINGS.TRANSLATION.paneTranslated` | Translated captions |
| `SETTINGS.TRANSLATION.pipContent` | Picture-in-Picture shows |
| `SETTINGS.TRANSLATION.pipContentOriginal` | Original only |
| `SETTINGS.TRANSLATION.pipContentTranslated` | Translated only |
| `SETTINGS.TRANSLATION.pipContentSplit` | Original and translated |

**Changed English values** (decision 1, because "Horizontal" now means side by side):

| Key | Old | New |
|---|---|---|
| `SETTINGS.TRANSLATION.modeSplit` | Horizontal Split (Bilingual) | Split (Bilingual) |
| `SETTINGS.TRANSLATION.modeSplitDesc` | Original instruction on top, translated captions below | Original and translated captions in two panes |

The old `modeSplitDesc` also says "instruction", which looks like a typo for "text". The pane-swap string deliberately says "panes" and names both panes, so it can't be confused with U2's "Swap spoken and translation languages".

I'll confirm that `translate.py` regenerates *changed* English values and not just missing keys. If it only fills gaps, I'll remove the two old keys from the other locales before running it, and report that.

## 10. Decisions for approval

Each has a recommendation. Reply "approve" to take them all, or list changes.

1. **Orientation naming and the existing label.** Store `splitOrientation` as `'vertical'` (stacked, default) or `'horizontal'` (side by side), as FR-D2 defines. Relabel the existing `modeSplit` / `modeSplitDesc` to drop "Horizontal", since it currently describes the stacked layout. *Recommend yes.* The alternative is to leave the old label, which would contradict the new orientation option.
2. **Pane order semantics.** `paneOrder` is `'original-first'` or `'translated-first'`, where "first" is the logical start side, so it flips with an RTL interface. *Recommend logical.* The alternative is a physical left/right order that ignores the interface direction.
3. **Where the controls live.** Settings form (orientation, PiP content), sidebar (orientation, pane swap, PiP content), and a small divider control cluster (orientation, pane swap) inside the caption container so it also works in PiP. *Recommend all three.* Without the cluster, a PiP user can't change layout without returning to the main window.
4. **Meaning of "aligned".** One line per segment, in order, with a placeholder for each pending translation (slot-per-segment). Not equal row heights. *Recommend slot-per-segment.* A shared row grid is possible but conflicts with independent text flow and PiP sizing.
5. **Placeholder look.** A muted pulsing "…", static under reduced motion, `aria-hidden`; shown in every translated pane (including translated-only) and never when translation is off; pass-through segments resolve immediately; never show original-language text as a fallback. *Recommend as written.*
6. **`app-recognized-text` API.** Add an optional `lines` input and make `textOutput` optional, so the viewer's `string[]` path keeps working. Track by `id`. *Recommend this.* The alternative is a parallel `lang` array, which is easier to get out of step.
7. **PiP content.** `pipContent` defaults to `'translated'`, applies only when translation is on, is independent of the in-window mode, and uses the same orientation and order for `split`. *Recommend as written.* No automatic orientation change for PiP's small default window.
8. **Language labels after a swap.** Pane labels show the current language only. The original pane adds a small chip on lines whose language differs from the label; the translated pane never needs one. *Recommend this.* The simpler alternative is no chips; then mixed or older lines are unmarked, although they still have the right `lang` attribute.
9. **Viewer (`broadcast-render`).** Leave it alone in U3. It keeps its own stacked split and ignores orientation and pane order. `app-caption-panes` is written so U4 can adopt it together with segment IDs. *Recommend leaving it.* The alternative is migrating the viewer's markup to the shared component now, for layout only, with its index alignment unchanged. That gives viewers the orientation setting but adds regression risk to a suite that passes today, and goes beyond the scope you set.
10. **Server sync.** The new fields ride in `translation` and sync with the other UI settings. I'll check the server schema while implementing and add props if it rejects unknown fields. *Recommend yes.*

## 11. Test plan

Component specs for `recognition-render` still fail on pre-existing setup gaps (`webkitSpeechRecognition`). Logic therefore lives in pure helpers and the reducer, and those are what the new tests cover.

| Spec | Cases |
|---|---|
| `settings.reducer.spec.ts` (extended) | **Orientation:** `setSplitOrientation` sets and persists the value; the default is `vertical`. **Pane swap:** `swapCaptionPanes` toggles `paneOrder` both ways and **changes no language fields** (`lang`, `dialect`, `targetLanguage`, `dialectByLanguage` identical). `swapTranslationLanguages` leaves `paneOrder` alone. **PiP content:** `setPipContent` for each value; the default is `translated`. `saveTranslationSettings` accepts the new fields. |
| `settings.selector.spec.ts` (extended) | The three selectors return defaults when the fields are absent (settings stored before U3). |
| `settings.effects` (new spec, or extended if one passes) | The three actions trigger the translation write with the full `translation` object. `_applySettingsToDefault` fills the defaults for stored settings that lack them. If the existing effects spec can't be made to pass with providers only, this logic is tested through `_applySettingsToDefault` and the reducer. |
| `services/translator/caption-view.spec.ts` (new) | `resolveCaptionView` over every combination: mode off (including PiP) → `original`; PiP active → `pipContent` for each value; not PiP → `split` / `translated`. |
| `services/translator/caption-lines.spec.ts` (new) | **Placeholder alignment:** with 5 segments and translations for 2 of them, the translated list has 5 lines, in segment order, with the right `pending` flags. A translation arriving later fills the same `id` with no reordering. **Equal length** for both panes, so a `renderHistory` slice picks the same segments. A segment that rolled out of history is absent. **`lang`/`dir`:** an Arabic-spoken pane with an `en-US` segment gives `lang: 'en-US'`, `dir: 'ltr'` for that line and `rtl` for `ar-*` lines. The translated pane uses the target language and direction. Pass-through segments aren't pending. `foreignLang` is set only for original-pane lines whose base language differs from the label, and not for regional variants of the same language (`fr-CA` vs `fr`). |
| `segment-translations.spec.ts` (extended) | Pass-through groups can be resolved synchronously (the planner's `passThrough` flag drives it). |
| `recognized-text` (new spec if it can pass with the existing providers) | `lines` renders `lang`/`dir` per line. The `textOutput`-only path renders as before, with no `lang`/`dir`. Track-by `id` keeps the same element when a pending line gets its text. |
| Translation settings form | Orientation and PiP content save through one `saveTranslationSettings`. Added only if the component spec can pass with providers, otherwise covered by the reducer. |

**Pass criteria:**
- `npx jest -c packages/client/jest.config.ts --ci --forceExit`, output to a log: **no new failing suites**, compared by name against the 45-of-106 baseline (timing suffix stripped).
- `npx tsc -p packages/client/tsconfig.app.json --noEmit` is clean.
- New unit tests exist and pass for orientation and pane-swap persistence, placeholder alignment, per-line `lang`/`dir`, and the PiP content setting.
- Server typecheck and the UI-settings schema check are clean if the schema changes.

## 12. Constraints observed

- **Angular 16:** no new `toObservable()` calls are needed. New code uses `computed` over existing signals. Any that appears is created in a constructor or field initializer.
- **Azure recognizer configuration** is not touched, and nothing here adds language detection.
- **Translation** stays on Chrome's on-device `TranslatorApiAdapter`.
- **Spoken language** vs **interface language** stay separate; U3 reads only the spoken language for labels and `lang`.
- **No new platform facts** are needed, so no new docs lookups. The Document PiP behaviour used here (one PiP window; the element is moved into it; the sidebar stays behind) is already in `audit.md` and in `DocumentPipService`.

## 14. Deviations found during implementation

- **No separate `app-caption-panes` component.** The two pane bodies are `ng-template`s in `recognition-render`, rendered in `panes()` order with `ngTemplateOutlet`. This avoids projecting the translated-pane controls through a content slot. The pure logic (`caption-view.ts`, `caption-lines.ts`) is separate, so U4 can still lift the markup into a shared component when it migrates the viewer.
- **Server schema (decision 10):** the server `UiSettings` schema has no `translation` field at all, so translation settings (mode, target and now the layout fields) never synced. Nothing to change; syncing translation settings is out of scope.
- **Pass-through resolves in a microtask, not synchronously.** `translatePendingSegments` runs inside a `toObservable` callback, and the existing code already keeps signal writes off that path (async merge). I followed that rather than testing whether a synchronous write would throw, so pass-through groups use `Promise.resolve(texts)` through the same merge. No placeholder lingers, but one may paint for a microtask. (An earlier version of this note said Angular 16 forbids the write; I didn't verify that.)
- **Icons:** `heroViewColumns`, `heroQueueList` and `heroArrowsUpDown` were added to the shared-ui icon set. The pane swap uses up/down arrows so it can't be mistaken for the language swap's left/right arrows.
- **`translate.py` fills only missing keys** and writes no trailing newline (committed non-English locales have none, `en.json` does). The two relabelled keys (`modeSplit`, `modeSplitDesc`) were removed from the other ten locales first so the script regenerated them.
- **Sidebar placement:** orientation (two buttons) and pane swap show in split mode; the Picture-in-Picture control shows when Document PiP is supported, the sidebar isn't the viewer's (`showPip`), and translation is on.

## 13. Out of scope

- Viewer-side layout and ID alignment (U4).
- Per-language windows (U5) and OBS (U6).
- A draggable divider (US-C4).
- A row-aligned grid across panes (decision 4).
