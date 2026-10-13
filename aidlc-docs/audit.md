# AI-DLC Audit Log — On-Device Translation

## 2026-10-10 — Inception kickoff

**Human request (summary):** Use AI-DLC to spec on-device translation now that Chrome ships it. Ensure clean git state first. Cover three stories:
1. Simple speak-and-translate for conversation with another hearing person, where the input language alternates between turns.
2. Present a single translated caption feed on a screen.
3. Display original and translated text simultaneously, split horizontally or vertically.

**AI actions:**
- Git: `develop` was clean but 2 commits behind `origin/develop`; fast-forwarded to `7e0f8a4` (PR #146). Left 3 pre-existing stashes untouched. Created `feature/on-device-translation`.
- Researched the platform API (Chrome Translator / Language Detector APIs; see requirements §2).
- Reverse-engineered the caption pipeline (requirements §3).
- Drafted requirements, verification questions, personas, stories, and proposed units of work.

**Awaiting:** Human answers to verification questions and approval before Construction.

## 2026-10-10 — Answers received; Azure bilingual correction

**Human:** answered Q1–Q10 (see requirements §7). Added: Azure `fr-CA` must keep automatically switching between French and English. Corrected the AI: this is documented Azure behavior. Asked for the Azure STT docs to be indexed in docs-mcp, then for the index to be fixed.

**AI actions:**
- Wrongly claimed `fr-CA` switching was unimplemented and proposed continuous LID. **Retracted.** Source found: STT release notes ("Bilingual Speech Modeling": `fr-CA` French+English, `es-US` Spanish+English; also `ar-*` + English and `en-IN` English+Hindi). These work natively from the locale alone.
- Spec revised: Azure recognizer config is unchanged for bilingual locales. Per-segment language for translation comes from the browser's `LanguageDetector`, restricted to the pair. Bilingual locales give automatic turns in conversation mode.
- docs-mcp library `azure-speech-to-text`: the HTML crawl reached only 131 of ~197 TOC pages (Learn's nav is built by JavaScript), and GitHub-repo mode indexed nothing. Fixed by adding each missing TOC page through the docs-mcp CLI with `--no-clean`.

## 2026-10-10 — Adopt crippit `translations` branch; broadcast & PiP refinements

**Human:** merge crippit/zip-captions `translations` into this branch and build on it. Keep our broadcast design: if the broadcaster translates, viewers get both languages. Keep viewer-side translation as a fallback for other languages on supported devices. Investigate Document PiP with separate windows per language as a configuration option.

**AI actions:**
- Merged `crippit-gh/translations` (`8fbbd92`) as `507fe2a` with no conflicts. Gap analysis is in `inception/application-design/units-of-work.md`.
- Found a regression in the merged code: the `saveTranscriptionSettingsFailure` reducer handler was removed (scheduled in U0).
- Document PiP research: WICG spec §6.5 allows at most one PiP window per top-level browsing context, and `requestWindow()` closes the opener's existing one. Separate per-language windows are therefore specified as popups synced over `BroadcastChannel`. A popup gets its own PiP window only if a spike confirms Chrome allows PiP windows in two top-level windows at once.
- Added FR-B1…B5, FR-W1…W5, US-D3, Epic W; rescoped units to U0–U7.
- Test baseline: `develop` has 46/96 suites failing (pre-existing test-setup gaps). The merged branch has 47/98; the only new failure is `broadcast-render`, which exposes a real runtime bug (NG0203 from `toObservable()` in `ngOnInit`). Added to U0.

## 2026-10-10 — Baseline fixes; scope change

**Human:** fix the NG0203 bug by moving `toObservable` into the constructor (repo convention), and restore the deleted reducer handler. Keep all 17 translation targets. Descope conversation / two-way translation to a later release.

**AI actions:**
- `2292605`: `toObservable` moved into the constructors of `BroadcastRenderComponent` **and** `BroadcastRoomComponent`. The broadcaster had the same bug, hidden by a pre-existing `webkitSpeechRecognition` test-setup failure. Restored the `saveTranscriptionSettingsFailure` handler and added `settings.reducer.spec.ts`. Verified: `broadcast-render` and the new reducer suite pass, and `broadcast-room` fails only on the pre-existing test-setup issue (same as `develop`).
- Spec: Q3 amended (17 targets in Release 1). Epic A / FR-C* moved to Release 2. Release 1 units renumbered U0–U6, with R2-U1 for conversation.

## 2026-10-10 — U0 baseline hardening complete

**Human:** "proceed".

**AI actions (`3c53761`):**
- `TranslatorApiAdapter` (shipped `self.Translator` only).
- Eligibility = API present and not Android/iOS, with `unsupportedReason()`. The settings form is read-only with an explanation when ineligible, plus an "Experimental" badge. Render components treat translation as off on ineligible devices.
- `lang`/`dir` on caption panes.
- Download progress handles Chrome's 0..1 fraction.
- i18n: 2 new keys × 11 locales. Removed dead duplicate `SETTINGS.TRANSLATION` blocks in de/es/fr/it (verified identical parsed JSON).
- Tests: translator service 16 cases, settings 4 cases. Full client suite: 46/99 suites failing vs 46/96 on `develop`, with **no new failures**.
- Flagged two copy issues for a maintainer decision (privacy notice; RAM/disk requirements). See units-of-work.

## 2026-10-10 — Privacy notice fix; translation approach clarified

**Human:** fix the privacy notice. Clarify the translation approach: adopt crippit's on-device PoC, with free, privacy-respecting methods only. Use `scripts/translate.py` for locale strings.

**AI actions:**
- Clarified that "Translator API" is Chrome's built-in **on-device** translation (the same API crippit's PoC calls), not a paid cloud service. Added requirements §2.0.
- `191d2da`: accurate privacy notice plus a speech-recognition line. Locale strings regenerated with `scripts/translate.py`, replacing my earlier hand translations. English split into single sentences because M2M100 dropped trailing sentences. Rephrased "never leaves" after the Ukrainian output inverted it.

## 2026-10-10 — Hardware warning replaced

**Human:** remove the settings-page hardware warning and describe per-language models in the views (suggested "~5GB per translation file"). Translation-script quality is out of scope. Index docs into docs-mcp and use it rather than fetching.

**AI actions:**
- Indexed Chrome built-in AI docs as docs-mcp library `chrome-built-in-ai`. They confirm the 22 GB / 16 GB / 4 GB VRAM requirements apply only to the Gemini Nano APIs. Translator packs are "downloaded on demand", **with no size published**.
- `da8445b`: removed `checkSystemRequirements()` and its warnings. Added a "Translation models" note in settings and a "One-time download for this language pair" note under the download buttons. No "~5GB" figure, because it isn't supported by the docs.

## 2026-10-10 — U1 caption segment model complete

**Human:** proceed with U1. Approved the design with three decisions: filter empty Azure segments now (an existing bug); keep translations in memory for the current session only; 4 translators and 500 cached segments are fine.

**AI actions:**
- Design: `construction/u1-caption-segment-model/functional-design.md`.
- `CaptionSegment` and `CaptionSegmentHistory`. IDs are `${engine}-${epoch}-${seq}`, assigned once, so they are stable across rollover. Both engines publish `Signal<CaptionSegment[]>`, and `getRecognizedText()` is derived from it, so existing consumers are unchanged. Web `lang` is captured at each recognition `start`. Azure `lang` is the configured locale, and Azure config is unchanged.
- Azure `NoMatch`/empty results no longer append a blank caption or dispatch an empty transcript segment.
- `ChromeTranslatorService`: an LRU cache of up to 4 translators per pair. Segment translations are capped at 500 and cleared on `RecognitionActions.disconnect` (via an effect) and when a viewer leaves (`broadcast-render`). Public API is unchanged, plus `clearSessionCache()`.
- Found by the new tests and fixed: concurrent `getOrCreateTranslator` calls for the same pair each created a translator, because the pending promise was registered after an `await`. A user-initiated request no longer joins a background one.
- `recognition-render`: translations are keyed by segment ID, so late results can't land on the wrong line. Previous translations stay visible until re-translation completes. `broadcast-render` (viewer) stays index-aligned until U4.
- Corrected requirements §3: Azure history was already capped at 15 in the baseline.
- Tests: 6 new or extended suites (segment history, alignment helpers, Web and Azure engines, facade compatibility, translator cache). Full client suite: 45 of 103 failing vs 46 of 99 at `97216ea`. Compared by name: **no new failures**, and `recognition.service.spec` is fixed (stub engines). Typecheck is clean.
- Note: a full run once hung with idle workers. A rerun completed normally.

## 2026-10-10 — U2 rescoped to language pair controls

**Human:** the UI should let users delete downloaded models, if the Chrome API permits it. Detection is only relevant to conversation mode; otherwise the user sets the spoken and translation languages and can swap them. Park conversation mode and automatic detection. Respect a model's own language information (the Azure special case), but add no detection outside that.

**AI actions:**
- Rewrote the U2 design (`construction/u2-bilingual-language-tagging/functional-design.md`, v2). `LanguageDetector` tagging moved to R2-U1.
- docs-mcp findings:
  - The Translator API has no deletion method (`destroy()` frees memory only).
  - Chrome manages model storage itself and hides per-pair download status for privacy.
  - Azure SDK `RecognitionResult.language` is filled only "if provided", which the docs describe only for language-ID configs.
- Found an existing bug: Azure `setLanguage()` rebuilds the recognizer but never restarts continuous recognition, so a mid-session dialect change silently stops captions. The design fixes it (a swap would hit it every time).

**Awaiting:** approval of U2 v2 and decisions §8.1–8.4.

## 2026-10-10 — U2 language pair controls complete

**Human decisions on v2:**
1. Add the model-management note with a link to the relevant help page.
2. The dialect is bound to recognition, not the UI. Rename "Language" to "Spoken language" and add an optional "Interface language" defaulting to "Same as spoken language".
3. Fix the Azure mid-session restart.
4. Keep the bilingual hint.

**AI actions:**
- Design v3 (`construction/u2-bilingual-language-tagging/functional-design.md`). Requirements FR-L1–L4 added. FR-AZ-3/4 detection is marked parked.
- **Settings:** new `uiLanguage` (`'spoken'` default) and `selectUiLanguage`. All `translate.use` sites now use the effective interface language, so `setLanguage` no longer switches a fixed interface language. Server schema `uiLanguage` prop added. `translation.dialectByLanguage` remembers dialects.
- **Swap:** `swapLanguagePair` (pure, shared by the reducer and the settings form) and the `swapTranslationLanguages` action. Buttons are in translation settings (form; Save applies), the caption view (split and translated-only) and the sidebar (hidden for broadcast viewers). It's disabled with an explanation for ja/ko/hi/vi/ru/nl/tr.
- **Engines:** Web `setLanguage` stops while streaming so `end` restarts with the new language. Azure `setLanguage` stops and closes the old recognizer, then reconnects with the same config (fixes the silent stop). Azure honours `result.language` when present.
- **Translation:** `planTranslations` groups segments by their own language. Target-language groups pass through. Segments are retranslated when `lang` changes.
- **UI copy:** "This dialect also recognizes English" hint. "Chrome manages downloaded translation models…" note with "Learn more" linking to developer.chrome.com/docs/ai/understand-built-in-model-management (no user-facing Chrome Help article found in the indexed docs).
- **i18n:** 8 new English keys; the other locales were generated with `scripts/translate.py`.
- **Tests:** client suite 45 of 106 failing vs 45 of 103 after U1. Compared by name: **no new failures**, and the touched UI suites fail with the same pre-existing reasons. New or extended specs: reducer (swap, dialect memory, uiLanguage), selectors, settings model (bilingual map, swap rule), effects (UI language decoupling), Web/Azure engines (mid-session restart, config regression for bilingual locales, `result.language`), segment-translation planning, server schema. Client and server typechecks are clean. The server `ui-settings.service.spec` fails identically on the baseline (no model provider).

## 2026-10-10 — U3 split orientation, pane swap & PiP content complete

**Human:** proceed with U3. Approved the design with all ten decisions as recommended (stacked default; logical pane order; controls in settings, sidebar and a divider cluster; slot-per-segment alignment; pulsing placeholder; `lines` input on `app-recognized-text`; `pipContent` default translated; current-language labels with chips; leave the viewer for U4; server sync check). Asked to use the file tools, not shell commands, to explore the working directory.

**AI actions:**
- Design: `construction/u3-split-orientation-pip/functional-design.md` (deviations in §14).
- **Settings:** `splitOrientation`, `paneOrder`, `pipContent` (optional, selector defaults), actions `setSplitOrientation`, `swapCaptionPanes`, `setPipContent`, persisted by the existing translation write. `swapCaptionPanes` changes no language, and U2's `swapTranslationLanguages` is untouched.
- **Rendering:** `resolveCaptionView` replaces `effectiveTranslationMode`. `buildOriginalLines` / `buildTranslatedLines` give one line per segment, with per-line `lang`/`dir` and pending placeholders. `app-recognized-text` gained a `lines` input and tracks by segment ID. `recognition-render` renders panes in `paneOrder`, stacked or side by side, in full-screen and PiP, with a divider control cluster (works inside the PiP window).
- Found while reading: `renderHistory` sliced each pane's list separately, so a shorter translated list showed different segments from the original. Equal-length line lists fix it.
- Found while implementing: `translatePendingSegments` runs in a `toObservable` callback, where the existing code keeps signal writes off the synchronous path. Pass-through translation follows that and resolves through the existing async merge. (I first wrote that Angular 16 forbids the write; that wasn't verified and is corrected in the U3 design §14.)
- The server `UiSettings` schema has no `translation` field, so translation settings don't sync; nothing added.
- **i18n:** 10 new keys and two relabelled (`modeSplit`, `modeSplitDesc`; "Horizontal Split" described the stacked layout). `translate.py` fills only missing keys, so the two were removed from the other ten locales first. Trailing newlines match the committed files (none in non-English locales).
- **Mistake:** my new `recognized-text.component.spec.ts` overwrote a committed one-case "should create" spec. The case was restored in the new file.
- **Tests:** 5 new or extended suites (reducer, selectors, `caption-view`, `caption-lines`, `recognized-text` component, effects persistence). All pass. Full client suite: 44 of 109 failing. Compared by name against a `HEAD` worktree: **no newly failing suites**. The baseline run hung on its last suite and was killed (see the note in `units-of-work.md`). Client typecheck and `ngc` template check are clean. The `recognition-render` and sidebar component specs still fail on the existing test-setup gaps, so their logic is covered through the pure helpers and the reducer.
- Not verified in a browser: the layout, the divider cluster, PiP rendering and the placeholder animation were checked by type, template compile and unit tests only.

## 2026-10-12 — U4 broadcast both feeds complete

**Human:** asked for U4 to be delegated to Qwen. The AI explained that the Agent tool only runs Claude models and offered alternatives; the human then said to proceed with U4 itself. Approved the design with all ten decisions as recommended (additive v2 payload; synthetic IDs for old broadcasters; a shared translation pipeline; strict translation results; translated live line; broadcaster-first picker and ineligible-viewer access; coerce an unavailable target; shared pane component with the viewer migrated; late joiners left out; one offered language).

**AI actions:**
- Design: `construction/u4-broadcast-both-feeds/functional-design.md` (deviations in §12).
- Found while reading: `translateSegments` returns the source text on failure, so a forwarded "translation" could be untranslated text. This also corrects my U3 note that the translated pane never shows original-language text (it did, on failure).
- **Wire format:** the existing `live` / `segment` messages gain `v: 2`, `segments`, `translations`, `translated` and `translatedLive`, and keep `recognition` / `lang`, so old viewers are unaffected. `PeerService` parses both versions and exposes `segments$`, `offeredLanguages$`, `broadcasterTranslations$` and `translatedLiveText$`.
- **Broadcaster:** `SegmentTranslationSession` (extracted from `recognition-render`) and a root `CaptionTranslationService` own the local translation. `recognition-render` and `broadcast-room` consume it. `translateSegmentsStrict` returns `null` for failures, so only real translations are sent and the local translated pane keeps its placeholder on failure.
- **Viewer:** resolution rules (`resolveViewerTranslation`, `coerceViewerTarget`, `viewerLanguageOptions`). A phone viewer can show the broadcaster's translation and gets the translation menu. Local translation uses each segment's own language.
- **Layout:** the U3 panes were lifted into a shared `app-caption-panes` component, now used by the caption view and the viewer.
- **i18n:** 2 keys, generated with `translate.py`.
- **Caught by a test:** my first viewer rewrite called `toObservable` in `ngOnInit` and threw NG0203; moved to the constructor.
- **Corrected a claim:** I had written that Angular 16 forbids a synchronous signal write in the `toObservable` callback (U3 notes). That was never verified; the U3 design and the U3 audit entry now say so.
- **Tests:** new suites for the payload module, `SegmentTranslationSession`, the viewer rules and `CaptionTranslationService`; extended specs for `translateSegmentsStrict` and the viewer component (broadcaster translation shown on a device that can't translate, placeholders filling in place, split order and orientation, moving to an offered language, a v1 broadcaster). Full client suite: 44 of 113 failing. Compared by name against a `HEAD` worktree run: **no newly failing suites**. The baseline run hung near the end again and was killed (two suites have no baseline result; see `units-of-work.md`). Typecheck and the `ngc` template check are clean.
- Not verified: a real two-browser PeerJS session, Chrome's Translator API in this flow, and the visual layout. The `recognition-render`, sidebar and `broadcast-room` component specs still fail on the old setup gaps.

## 2026-10-12 — U5 spike: Document PiP in two top-level windows

**Question:** can an opener and a same-origin popup each hold a Document PiP window at the same time (FR-W3b / US-W3)?

**Method:** a throwaway page (not in the repo) with an opener and a `window.open` popup, each with an "Open PiP" button, logging `requestWindow()` results and `pagehide` on its own PiP window, mirrored between the windows over `BroadcastChannel`. Run by the human in Chrome 154.0.8037.98 (macOS 15.7.5, arm64), served from `http://localhost`.

**Result (human's observation):** opening a second PiP window closed the first, in both orders (opener first, popup first). No `requestWindow()` call was rejected.

**Log caveat (recorded for honesty):** the pasted log doesn't show the closure cleanly.
- Order 1: the popup's PiP resolved at 10.1 s and the opener's at 12.5 s. The popup's PiP `pagehide` is logged at 24.2 s, not at 12.5 s, and the opener's PiP closed at 17.2 s. Read literally, the two were both alive for about 5 s.
- Order 2: the popup's PiP closed at 35.1 s, before the opener's opened at 42.2 s, so the log has no overlap in that order.
- `documentPictureInPicture.window` is per window (each window reported `null` before its own request, and the popup reported `null` while the opener's PiP was open), so it says nothing about the other window.
- The likeliest reconciliation is that Chrome closed the first PiP at once and the `pagehide` reached the backgrounded popup late, as the human saw. That isn't proven. A poll of `pipWindow.closed` would settle it.

**Decision:** treat the human's observation as the result. FR-W3b / US-W3 (a PiP window per popup) are dropped. The popup works as a normal window. Single PiP (US-W1, `pipContent`) remains the floating option. The design adds no PiP to popups; it also adds nothing that would make one hard to add later, so a re-test can reopen it cheaply.

**Rescope (same day):** the human questioned the popup plan: the PiP is the product (placeable, always on top, minimal UI), popups don't replace it, and with translation on the PiP should show the spoken or the translated language, with dual-language display backlogged. Agreed: **U5 is PiP-only.** A minimal spoken/translated/both switch inside the PiP window (the sidebar is left behind, so today the feed can't be changed from the floating window), using the existing `pipContent` setting. The `split` option stays and serves as the simple dual-language display; a purpose-built dual-language design goes to the backlog. The projector use case (popups, full screen on any display, "Display windows") is deferred; the draft popup design is kept as `construction/u5-per-language-windows/backlog-popup-windows-design.md`. No code was written for either version.

**Docs:** indexed in docs-mcp as `document-pip` (Chrome guide; says `requestWindow()` needs a user gesture and is silent on several top-level windows) and `window-management` (`getScreenDetails()`, the `window-management` permission, `requestFullscreen({ screen })`). The WICG spec page produced no searchable content.

## 2026-10-12 — U5 PiP feed switch complete

**Human:** answered the spike (second PiP closes the first), questioned the popup plan (the PiP is the product; popups don't replace it), agreed to PiP-only, said to keep `split` and use it as the simple dual-language display, deferred the projector use case to the backlog, then approved all six decisions of the v2 design.

**AI actions:**
- Design: `construction/u5-per-language-windows/functional-design.md` (v2). The popup draft is kept as `backlog-popup-windows-design.md`. The first draft led with popups and gave the PiP a secondary role; the human's correction was right and is why U5 changed.
- **Code:** `showPipFeedSwitch(mode, pipActive)` and a three-way switch inside the PiP window (`EN` / `ES` / `EN+ES`) in `recognition-render`, dispatching the existing `setPipContent`. No new setting, action, effect or string, so no locale changes.
- **Docs:** requirements (FR-W2, W3a, W4, W5 to the backlog; FR-W3b dropped), stories (US-W1 amended, US-W2 backlog, US-W3 dropped), units-of-work, state.
- **Tests:** `caption-view.spec.ts` extended (3 new cases, 8 total, all pass). Full client suite: 44 of 113 failing. Compared by name against a `HEAD` worktree run: **no newly failing suite**. My first comparison showed every suite as new because the two runs print different path prefixes; I normalised the names and redid it. The baseline run hung on its last suite again and was killed (`save-to-server-dialog` has no baseline result; it fails on a missing `TranslateService` provider in its own spec). Typecheck and the `ngc` template check are clean.
- **Not verified:** the control in a real PiP window. Specifically that the `join` button group renders joined there (no other template uses `join`), that it fades with idle, and that it doesn't cover captions at the 640×320 default size.
- **Spike tooling:** the throwaway page was in the session scratchpad only, not the repo.

## 2026-10-13 — U6 OBS feed complete

**Human:** started U6, then approved all eight decisions of the design as recommended (setting in the translation settings with a radio pair in the OBS tab; one sender fed by `CaptionTranslationService`; original captions when translation is off or unavailable; pending and failed translations send nothing and the live line becomes strict; warn, don't transform, for non-Latin scripts; live line only; five i18n keys; scope as proposed).

**AI actions:**
- Design: `construction/u6-obs-feed/functional-design.md` (deviations in §11).
- Found while reading: OBS was fed from two places (the Web Speech `result` handler on any page, and `StreamCaptionsComponent` on the stream page), so the Web engine sent twice on the stream page and Azure sent only there and not while broadcasting. Also: `translate()` returns the source text on every failure, so `translatedLive` could hold untranslated text, and U4 forwarded it to viewers (U4's "only real translations" held for finals only).
- **Protocol (looked up):** `SendStreamCaption` is CEA-608, accepts empty text, fails unless the stream is active, and obs-websocket calls `obs_output_output_caption_text2(..., 0.0)` (no queue delay). libcaption drops characters outside its sets silently (`caption_frame_write_char`); Arabic, Chinese, Japanese, Korean, Hindi, Russian and Ukrainian have none. I could not read the per-letter map, so Polish, Turkish and Vietnamese are not claimed either way. `obs-websocket` is indexed in docs-mcp.
- **Code:** `obsFeed` in `TranslationSettings` (selector default `original`), `setObsFeed`, persisted by the existing translation write. Pure `resolveObsCaption`, `obsCannotShowLanguage`, `obsEffectiveLanguage`. Root `ObsCaptionFeedService` (injected in `AppComponent`) reads `CaptionTranslationService`; no second pipeline. Removed the Web Speech dispatch, the stream component's send, and the unused `sendCaption` action and effect. `sendCaption` now requires a connected socket and catches a rejected call. `liveOutput$` is strict (failure gives `''`, not the source) and no longer caches interim lines. Radio pair and two hints in Settings → OBS Studio.
- **Behaviour changes to note:** Azure now sends to OBS from every page; the Web engine's duplicate sends are gone; the translated live line (caption view and broadcast) shows nothing instead of source text when translation fails.
- **i18n:** 5 keys under `CONNECTIONS`, generated with `translate.py`; newline conventions kept.
- **Tests:** new `obs-caption.spec.ts` and `obs-caption-feed.service.spec.ts`; extended specs for the reducer, selector, settings effects, `obs-connection.service` and `chrome-translator.service` (live line). Full client suite: 44 of 115 failing. Compared by name against a `HEAD` worktree run (path prefix stripped): the same 44 fail on both sides, **no newly failing suite**; the baseline run completed this time. Typecheck and the `ngc` template check are clean.
- **Not verified:** OBS itself and a real stream (behaviour is read from `master` sources; a user's OBS may differ); which Latin-extended letters CEA-608 can show; whether a streaming platform renders the 608 track; the new settings group and hints in a browser; the `OBS settings` and `AppComponent` component specs (they fail or were not run on the existing setup gaps).
