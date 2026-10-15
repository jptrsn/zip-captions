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

## 2026-10-13 — Post-U6: manual findings, QA run, translation tooling

**Human:** reported a stale language chip, asked for the PiP controls to auto-hide like the main view, asked for test IDs on the feature's controls, reported untranslated and raw-key text in the Arabic settings UI (then asked for all languages), asked for a better translation model (Qwen on the Spark) and a README update, and asked for a review of translation accuracy.

**Bugs found and fixed (commits `118755b`, `b8e4f03`, `658f533`, `a83029b`, `ab4d3e1`):**
- **Language chip showed ES after switching to FR.** `<select [value]>` is bound before its `*ngFor` options exist, so a select created with target `fr` showed the first option. Reproduced in a jsdom test. Fixed with `[selected]` on the options in three templates (caption view, viewer, sidebar). Guard spec reads the templates.
- **PiP controls never came back after fading.** The activity listeners were on the drawer, which stays in the main window; only the caption container moves into the PiP window. My U5 note had assumed the handlers moved with it. Listeners added on the container.
- **Test IDs** added to the pane regions and label, caption lines, target selects, translated-controls wrappers, divider controls, download button and progress, OBS hints and translation settings blocks. `translation-test-ids.spec.ts` lists what each template must keep.
- **OBS strings:** the generated translations of "Original captions" and similar were nonsense (captures, hoods, capsules, "tribes"; Italian legend "Write a review on OBS"). Reworded to avoid the word, reusing existing keys; reworded variants of "captions" were tested on a scratch copy and did not help.
- **Settings UI scan, all 11 languages (browser):** raw keys `LABELS.transcription` and `LABELS.translation` and `[object Object]` on the Sync tab; `closeCookieModal` and a hard-coded English aria-label on the cookie dialog; raw enum `UNINITIALIZED` on the OBS tab. All three fixed. Untranslated English in Italian (Home, About, Accept, Reject, View Policy, Language), Portuguese (language names, Screen Wake), Spanish and French were refilled. Re-scanned in all 11 languages after the fix: no raw keys.
- Not changed, noted: `<html lang>` stays `en` and `dir` is not set for Arabic (no RTL layout); theme names stay English in most languages.

**Translation tooling (`38f3d0e`):** `scripts/translate.py` now uses any OpenAI-compatible chat server (the Spark's Qwen3.8-27B-FP8 was used), with a per-language glossary (seeded from strings already in the locale files, applied only to strings containing the term) and per-key context notes. The old offline model remains as `--backend m2m`. A trial on 12 strings x 10 languages took 34 s and fixed the "captions" mistranslation in 8 of 10 languages. README and INSTALL document the workflow and the feature (the README had no translation docs and still recommended DeepL).

**Accuracy review of the 36 strings this feature added (10 languages, 360 strings):** read every string with a back-translation beside it. An LLM judge was too noisy (119 flags, mostly plural/singular nitpicks) and was used only to find candidates. Found and fixed with context notes: "Translated only" rendered as "Subtitles" (fr) / "captions only" (ar) because the glossary applied to strings without the term (now conditional); "Stacked" meaning overlaid/overlapping/folded (de, id, pl, uk); Arabic "recognizes" as "acknowledges"; Indonesian "Pengakuan ucapan" (speech *confession*); French word order; Portuguese "Same as spoken language" losing "same as". Three re-runs were worse than the earlier output and were restored (pl, ar, de `sameAsSpoken`/`swapUnavailable`).

**Still weak after the final pass, for a native reviewer** (not hand-edited, per the standing rule):
- Ukrainian "Side by side" is "Побічно" (means *indirectly*). Indonesian "Sampingan" (side by side) and "Tumpang" (stacked) are weak.
- "Translated by the broadcaster": Italian "trasmettitore" and Portuguese "transmissor" mean a radio *transmitter*; Arabic "من قبل البث" is unnatural; Ukrainian "мовцем трансляції" and French "l'animateur" are questionable.
- Arabic "swapUnavailable" is awkward; German "Split (Bilingual)" is "Getrennt (Zweisprachig)"; French "Division (bilingue)"; Chinese "口语" for "spoken language".
- Everything else generated by `translate.py` earlier in the branch, and the whole of the other locale strings, has not been reviewed by a native speaker.

**Delegated QA (Qwen + puppeteer, `u6-qa-01`):** the orchestrator got a separate `qa.json` profile and a read-only `zip-captions-qa` agent; `delegate.py` gained `--profile`. Round 1 (45 min) and a correction round (25 min) both timed out with no report; the worker lost its browser context between rounds and then lost time on the cookie gate. Its narration for C1-C5 was consistent with what I then checked myself, and its C6 observations (bad Italian/Polish/Ukrainian/Arabic strings) were confirmed against the locale files. Per the delegation rules I stopped after two rounds. I verified the OBS setting myself in the browser: default, persistence across reload, both hints (including the CEA-608 warning in Arabic), and the new wording. Two QA findings (cookie gate, page quirks) are existing behaviour: saving appearance navigates home, and settings need cookies accepted.

**Tests:** full client suite 44 of 120 failing, the same 44 suites as the baseline, none new. `tsc` and `ngc` clean.

**Not verified:** the caption view, split panes, PiP, broadcast between two browsers and the live OBS feed in a running session; a real OBS; real Translator API translation in a browser; the two PiP and select fixes beyond reproduction and template guards.

### OBS feed, end to end against a mock OBS (same day)
A throwaway obs-websocket v5 server (scratchpad only, not in the repo) on port 4466 accepted the app's real `obs-websocket-js` connection, reported the stream as active and logged every `SendStreamCaption`. Live text was set from the browser console through Angular's dev-mode handles (no microphone), and Chrome's real Translator API was used.
- Connect: badge showed "Connected"; the app requested `GetStreamStatus`.
- Original feed: `captionText: "hello world"` received.
- Translated feed with translation **off**: the original was sent (`"second sentence"`); an identical repeat was not resent; a cleared live line sent `""`.
- Translation **on**, model **not** downloaded (`availability: downloadable`): the live line `"good morning everyone"` produced **no** call to OBS; the source text was not sent.
- Translation on, model downloaded via the app's button: `"good evening everyone"` reached OBS as `"buenas tardes a todos"`, never as English; the clear then sent `""`.
- **Observed quirk (pre-existing, not fixed):** the live-line pipeline drops a line identical to the last one it saw (`distinctUntilChanged`), so a line that failed while the model was missing is not retried until the text changes. In practice the next word changes it. Noted, not fixed.
- **Still not verified:** a real OBS (the mock implements only the handshake, `GetStreamStatus` and `SendStreamCaption`); that a streaming platform renders the CEA-608 track; the caption view, split panes, PiP and a two-browser broadcast in a running session; recognition itself.


## 2026-10-13 — U8 settings persistence (server schema, Sync tab match, PRIVACY.4.6)

**Human:** after PR #149 merged, asked for the follow-up on branch `feature/sync-transcription-translation-settings`; approved the design as recommended; confirmed removing `PRIVACY.4.6` ("we do not take payments"); said a local MongoDB, puppeteer and a dev emulator were available.

**AI actions:**
- Design: `construction/u8-settings-persistence/functional-design.md` (gate respected: stopped for approval before coding).
- **Server:** `transcription` and `translation` sub-schemas (`_id: false`, strings without enums, `dialectByLanguage` Mixed). Commit `6361995`.
- **Client:** `settingsMatch` extracted to `settings-match.ts`. Found while reading that the old rule also compared `JSON.stringify` per key, so key order alone could keep a saved account "out of sync" once the server returned the new fields; the old rule was re-run on three scenarios and got all three wrong. Commit follows `6361995`.
- **Privacy:** key deleted from `en.json` and 10 locales (one line each, formatting kept), entry removed from `privacy.component.ts`; guard spec added.
- **Tests:** new/replaced server specs (model, service, controller) and `settings-match.spec.ts`, `privacy-keys.spec.ts`. Each new server test and the privacy deletion tests were run against the old code first and fail there (server ones with type diagnostics off, since the old types lack the properties). Server: 8 of 12 suites fail (was 10), all untouched boilerplate. Client: 44 of 120 failed on the `93fc76b` worktree and 44 of 122 now, the same 44 by suite name, none new; no hang. `tsc` (client and server) and `ngc` clean.
- **Direct request:** built the server, ran it on port 3100 against the local MongoDB with a JWT signed with the dev secret (user id `u8-e2e-test-user`, removed afterwards). Verified: 401 without a token, 403 for another user; a full client payload POST returns and stores `transcription` and `translation` (checked in Mongo, no `_id` in the sub-documents, an unknown nested key dropped); an older-client POST without them leaves the stored values; a later POST without `dialectByLanguage`/`obsFeed` removes them; after a server restart (empty cache) a GET returns the stored copy.
- **Display of dev env:** I printed `.env.serve.development` including its dev credentials to the terminal while looking for the Mongo settings (my redaction pattern was too narrow). They are local-development values already in the repo tree, but they are now in this session's transcript.

**Not verified:** the real login flow and a second device; the Sync tab in a browser (it needs a login); the privacy page in a browser (`/privacy` redirects to `https://www.zipsolutions.org/privacy.html`, which I could not load from the browser tooling; checked afterwards by fetching it: HTTP 200, no payment services paragraph or PSP wording, only a data-category table row "payment information" marked NO. Only the text was searched, not the whole policy read); behaviour against the production MongoDB version.

## 2026-10-14 — U8 follow-up after the #150 review

**Human:** decided on the CodeRabbit feedback: keep `pipContent` and `obsFeed` local to each device on apply (reversing the earlier decision to sync the whole `translation` object); add a validator for `dialectByLanguage`; push and reply on the PR.

**AI actions:**
- **Client:** `omitDeviceSettings` and `applySavedTranslation` (pure, in `settings.model.ts`), used by the sync selector, the apply effect and `settingsMatch`. 11 new client tests, all failing against the old production code; the surrounding suites near the change pass or are among the 44 baseline failures (checked by name).
- **Server:** the two keys removed from the schema; `dialectByLanguage` validator; validation errors answered with 400. 9 new tests, failing against the old code. Server run against a real server and local MongoDB: a snapshot with `pipContent`/`obsFeed` stores neither, a bad `dialectByLanguage` returns 400 and leaves the stored document unchanged. Test data removed.
- **Slip:** a `git stash` command failed on a path variable (zsh does not split it), and the following `git stash pop` tried to pop one of the human's older stash entries. Git aborted it because it would overwrite local changes, so nothing was applied; the three older stash entries are intact. I switched to copy-and-checkout for the old-code runs.
- Declined: `settingsMatch` ignoring saved nested keys the current state lacks (see U8 design §11).

**Not verified:** the Sync tab and apply in a browser; two real devices.

## 2026-10-13 — U9 client test debt, PR 1 (feature/fix-failing-client-tests-1)

**Human:** approved the U9 design as recommended and asked to start PR 1.

**AI actions:**
- Design: `construction/u9-client-test-debt/functional-design.md` (notes in §8). Branch off `develop` @ `93fc76b`; only the U9 design doc was carried over from the #150 branch.
- Fixed 19 client suites (groups A minus `user-saved-settings`, E, G): scaffold providers, shallow rendering for container components, stubbed `CaptionTranslationService` / `TranscriptionService`, and 73 behaviour tests. Rewrote the stale `start-broadcast` and `join-broadcast` specs.
- Mutation-checked 14 components (one broken line each; all specs failed; restored).
- Full client run vs the `develop` baseline, by suite name: 44 failing → 25, no newly failing suite. One worker crash (SIGSEGV) on `recognized-live-text` and a hang on the last suite (`language-selector`); both pass alone.
- Product findings, not fixed: the join-id dash insertion bug and the always-rendered start button (see §8).

**Not verified:** the components in a browser (these are specs); that the 19 suites stay stable across runs; the SIGSEGV cause.

## 2026-10-14 — U9 client test debt, single PR (feature/fix-failing-client-tests-1)

**Human:** pushed the branch, approved folding the remaining groups into the same PR with a stop at 80 counted files, and asked me to continue while waiting on review quota for #150.

**AI actions:**
- Fixed the remaining suites: the three services, the two OAuth components, the interceptor, guard and user reducer, the two confirmation dialogs and the engine select, `editable-string`, `transcript-enabled`, `end-broadcast`, `room-card`, `home`, `welcome-splash`, `settings`, `peer-landing`, `stream-captions`, `broadcast-room`, the control sidebar, `recognition-render` and `app.component`.
- Every spec tests behaviour; mutation checks on the large components (restored afterwards).
- Full client run vs the `develop` baseline by suite name: 43 fixed, none new, none missing; 119 of 120 passing, the 120th being `user-saved-settings` (waits for #150).
- 43 files counted for CodeRabbit.
- Findings (not fixed): Portuguese strings in `es.json`; client/server room route mismatch (dead code); `settings.language` vs `lang`; unhandled delete failure in the room card; id mangling when set in one go; always-visible Create button.

**Not verified:** components in a browser (these are specs); that the specs stay stable across runs and CI (the earlier worker segfault and last-suite hang did not recur in this run).

## 2026-10-14 — U9 closed for the client suite

**Human:** #150 is merged; open the U9 PR and continue with the next fixes.

**AI actions:** merged `develop` into `feature/fix-failing-client-tests-1` (documentation conflicts only: kept both sides of `audit.md` and `units-of-work.md`, kept this branch's U9 design). Fixed `user-saved-settings` (16 tests; 3 mutations caught). Full client run: 122 of 122 suites, 772 tests pass.

**Not verified:** stability across repeated or CI runs; the components in a browser.

## 2026-10-14 — U9 client findings fixed (on #151)

**Human:** fix the client findings from earlier and include them in the tests PR.

**AI actions:** six commits on `feature/fix-failing-client-tests-1`, each with a test that failed before the fix (see U9 design §12). Spanish locale: six strings regenerated with `translate.py` (three Portuguese, three Italian; my earlier count of four had one false positive). `AppComponent` storage key. Room card delete error and id locking. Shared `formatSessionId`. Removed the unused rooms-save code. The "Create button always shown" finding was wrong: the stream page already gates the form, so I added tests instead of changing code.

**Not verified:** the join form paste behaviour in a browser; the regenerated Spanish by a native speaker.

## 2026-10-14 — Response to the CodeRabbit review of #151

**Human:** reported feedback (written as "PR 150"; #150 had none, #151 had a review).

**AI actions:** addressed nine inline comments and one outside the diff. Found while auditing that four specs (login, provider, user-home, ui-settings) were still creation-only, contrary to what I had written in the PR text; wrote real specs for them and corrected the PR. Added the room card delete-failed message with one new string, generated in 10 locales with `translate.py`. Mutation-checked the changes. Full client suite 837 tests.

**Not verified:** the new message in a browser; the 10 generated translations by a native speaker.

## 2026-10-14 — Second CodeRabbit round on #151

**Human:** reported more feedback on #151 (the Qwen review was cancelled because CodeRabbit finished first).

**AI actions:** two comments, both valid: renamed a test; added an in-flight guard to the room card's delete (a real double-click bug). Tests failed before the fix; `tsc` and `ngc` clean.

## 2026-10-14 — U9 server suites (feature/fix-failing-server-tests)

**Human:** #150 merged; asked me to open the next PR and move on with the next fixes.

**AI actions:** opened #151 (client suites, 122 of 122 passing). Started the server suites on `feature/fix-failing-server-tests` off `develop`: 8 failing suites replaced with behaviour specs, 12 of 12 passing (148 tests), mutation-checked, server builds. Two production fixes in their own commits (supporter `tiers` removal; `SupporterService` import). Two defects recorded as `it.failing`.

**Not verified:** against a real MongoDB (the models are stubbed or in-memory); the webhook with a real Patreon payload.

## 2026-10-14 — U9 server defects fixed (on #152)

**Human:** the three server defects are next.

**AI actions:** three fixes, each with a test that failed first and its own commit: the wrong argument in `getUserIdForNewClientConnection`; the static room id check (validator changed to follow the generator, since stored ids come from the generator); `endBroadcastSession` returning null instead of throwing. Found while doing the third: any client can end another user's live broadcast (lookup by room only). Recorded as an `it.failing` test and **not changed**, because the fix changes who may end a broadcast. Server: 12 of 12 suites, 152 tests.

**Not verified:** against a real database; the room id convention against production data (I reasoned from the generator, not from stored ids).

## 2026-10-14 — Ownership check on ending a broadcast (on #152)

**Human:** approved the fix and asked for a test.

**AI actions:** `endBroadcastSession` now requires the broadcast's `hostUserId` to be the client's user (null otherwise); the `it.failing` test became a normal test, plus tests for another device of the same user and for several live rooms. The non-host test failed before the fix. Gateway log message updated.

**Not verified:** with real clients, in particular the anonymised second tab.

## 2026-10-14 — Qwen review of #152

**Human:** decided: remove the unreachable branch and its test; add the clarification; do the `toBe(0)` nit.

**AI actions:** tested the review's main claim against a real MongoDB (Mongoose 7.8.6; `endTime: undefined` matches only live broadcasts) and found it does not hold. Removed the dead branch, its user lookup and its test (server: 153 tests). Documented the `setId` limitation of the ownership check. The seven inline comments on #152 were unreadable (`@c1.md` to `@c7.md`); only the review body was read.

**Not verified:** the content of the seven inline comments.

## 2026-10-14 — The #152 inline comments

**Human:** the inline comments on #152 were meant (not #153).

**AI actions:** read the seven comments. Re-tested the `endTime: undefined` claim at the wire level (undefined is sent as null; with the ended broadcast first only the live one matches) and found the app sets no `ignoreUndefined`; noted that production appears to be Cosmos DB, which I did not test. Added the gateway rejection test, documented the helper's limits and moved it to `packages/server/test/` (not in the bundle). Extended the `setId` limitation with the `hostClientId` takeover. Left the webhook comparison and missing-secret warning for a decision.

**Not verified:** the `undefined`/`null` behaviour on Cosmos DB.

## 2026-10-14 — Webhook hardening (on #152)

**Human:** yes to both webhook changes.

**AI actions:** constant-time signature comparison (exactly 32 hex characters, then `timingSafeEqual`) and a start-up warning when `PATREON_SUPPORTER_WEBHOOK_SECRET` is unset, each with tests that failed first and its own commit. A test-setup trap: in Jest 29.5.0 `restoreAllMocks` strips a wrapped `jest.fn`'s implementation (checked with a throwaway spec, despite the documentation saying only spies are restored), so the real `timingSafeEqual` is restored in `beforeEach`. Checked against the built server. Server: 165 tests.

**Not verified:** with a real Patreon webhook delivery.

## 2026-10-14 — CodeRabbit comment on the #152 test helper

**Human:** reported feedback on #152.

**AI actions:** one valid comment (ObjectIds compared by identity in the in-memory model's matcher). Fixed with a `sameValue` comparison (Dates by time, ObjectId by value or string form) and a new spec for the helper (14 tests; 7 failed first). Server: 13 of 13 suites, 179 tests; `tsc` and the build clean; the helper is not in the bundle.

## 2026-10-14 — CI job (#153)

**Human:** opened #153 for the tests workflow; restore the removed lock entry; bump the actions to v7; then merged #151 and #152.

**AI actions:** workflow on pull requests with parallel client and server jobs; regenerated the lock file for npm 11 (the first run failed in `npm ci`), restored the dropped nested `@swc/helpers` entry after the Qwen review, bumped the actions to v7; each verified on GitHub with a throwaway branch (both suites green, Node 20 warning gone). After #152 merged, `develop` was merged into the branch with no conflicts.

**Not verified:** that the check is required for merging (branch protection is the human's setting).
