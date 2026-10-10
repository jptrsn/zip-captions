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
