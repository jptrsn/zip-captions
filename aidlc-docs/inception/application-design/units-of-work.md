# Units of Work

Each unit is a separately reviewable PR into `feature/on-device-translation`, in this order.

## U1 — Caption segment model (prerequisite, no UI change)
Introduce `CaptionSegment { id, text, lang, start? }`. Both engines publish `Signal<CaptionSegment[]>`, and both cap history at `MAX_RECOGNITION_LENGTH` (this fixes the unbounded Azure array). `RecognitionService` exposes `getRecognizedSegments()`, and the existing `getRecognizedText()` is derived from it, so current consumers are unchanged.
*Enables:* FR-9, FR-AZ-3, FR-D3, FR-B1.

## U2 — Bilingual-locale language tagging
`BilingualDialects` metadata (`fr-CA`, `es-US`, `ar-*`, `en-IN`). A `SegmentLanguageTagger` that runs `LanguageDetector`, restricted to the locale's pair, on final segments when translation is on, and keeps the last language when confidence is low. A settings hint. **No change to Azure recognizer construction**; add a regression test proving that.
*Stories:* US-AZ1, US-AZ2, US-AZ3.

## U3 — `TranslationService` + browser adapter
Adapter over `self.Translator`. Eligibility check (API present and desktop). Translator cache per pair, sequential queue with "latest wins" for interim text, translation keyed by segment `lang`, pass-through when source = target, dialect → code map.
*Stories:* US-0.1 (logic), US-0.2 (logic), US-B3.

## U4 — Settings & state
NgRx translation slice: enabled, target, displayMode, splitOrientation, swapPanes, interim, conversationPair, obsFeed. Settings → Translation panel with the Experimental toggle (disabled when ineligible) and Prepare languages. i18n in 11 locales.
*Stories:* US-0.1, US-0.2, US-0.3, US-A1.

## U5 — Translated & split rendering
`RecognitionRenderComponent` handles `original | translated | split(horizontal|vertical)`, reusing the existing text components for each pane. PiP and full-screen.
*Stories:* US-B1, US-B2, US-C1–C3.

## U6 — Conversation mode
Runtime input-language override in `RecognitionService`. Manual Switch (finalize, then restart) plus a shortcut. Automatic direction when segments carry a detected `lang` matching the pair. Two-pane view with language badges.
*Stories:* US-A2–A4.

## U7 — Output routing
OBS feed setting, and a broadcast payload carrying both feeds (backward compatible). Viewer display choice.
*Stories:* US-B4, US-D1, US-D2.

## Follow-ups
US-C4 draggable divider. More bilingual profiles (for example `en-IN` + `hi-IN`) once more recognition languages exist.
