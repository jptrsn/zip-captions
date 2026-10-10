# Units of Work

Each unit is a separately reviewable PR into `feature/on-device-translation`, in this order.

## Baseline (merged 2026-10-10, `507fe2a`)
crippit/zip-captions `translations` (Chris Webb) provides:
- `ChromeTranslatorService` (download and progress, debounced "latest wins" live translation, segment cache)
- Translation settings panel with RAM/disk checks
- `split` (stacked) and `translated-only` modes
- Translated-only Document PiP
- Viewer-side broadcast translation (FR-B3)
- Azure and Web history caps
- i18n strings

| Spec item | Status in baseline |
|---|---|
| FR-1, FR-3, FR-5 | Mostly done. A single translator instance thrashes when the pair changes. |
| FR-2 / Q9 eligibility | **Gap:** the toggle isn't disabled when ineligible, there's no mobile check, and there's no "Experimental" label |
| FR-4 / Q3 targets | **Deviation:** 17 targets, not the 11 interface languages |
| FR-6 `lang`/`dir` | **Gap** |
| FR-9, FR-AZ-* | **Gap:** the source language is always the global dialect |
| FR-C* conversation | **Gap** |
| FR-P1/P2 | Done |
| FR-P3 OBS feed | **Gap** |
| FR-D1, FR-D4 | Done (stacked) |
| FR-D2 orientation/swap | **Gap** |
| FR-D3 alignment | Partial: index-aligned per render; no IDs |
| FR-B1, FR-B2, FR-B4, FR-B5 | **Gap** (FR-B3 done) |
| FR-W* | Partial: PiP is forced translated-only |
| NFR-7 | Done |
| Regression | `saveTranscriptionSettingsFailure` reducer handler removed |

## U0 — Baseline hardening
Restore the `saveTranscriptionSettingsFailure` handler. Add eligibility gating (`'Translator' in self` and desktop; toggle disabled with an explanation; "Experimental" label). Limit targets to the interface languages (Q3). Trim the pre-release API probes down to the shipped `Translator` API. Add `lang`/`dir` on caption text. Add tests for the translator service through an adapter.
*Stories:* US-0.1, US-0.3.

## U1 — Caption segment model
`CaptionSegment { id, text, lang }` from both engines, with `getRecognizedText()` derived from it for existing consumers. Translator cache keyed by pair (multiple live translators), not a single instance.
*Enables:* FR-9, FR-D3, FR-B1, conversation mode.

## U2 — Bilingual-locale language tagging
`BilingualDialects` metadata. `LanguageDetector`, restricted to the pair, tags final segments. Per-segment translation source, with pass-through when source = target. Azure config is unchanged, with a regression test proving it.
*Stories:* US-AZ1–AZ3.

## U3 — Split orientation, swap & PiP content
Horizontal/vertical, pane swap, language labels. A PiP content setting (FR-W1).
*Stories:* US-C1–C3, US-W1.

## U4 — Conversation mode
Language pair, manual Switch (finalize, then restart), automatic turns on bilingual locales, two-pane conversation view.
*Stories:* US-A1–A4.

## U5 — Broadcast both feeds
Versioned payload carrying `{ id, text, lang }` for both original and translated segments, plus `translations: [targetLang]`. Viewer picker merges the broadcaster's languages with local ones (FR-B4/B5). Old viewers still get `recognition` as before.
*Stories:* US-D1–D3.

## U6 — Per-language windows
**Spike first:** can two top-level windows hold Document PiP windows at the same time in Chrome? Then: a popup per language synced over `BroadcastChannel`, full-screen on any display, closing with the opener, and its own PiP window if the spike passes. Settings → "Display windows".
*Stories:* US-W2, US-W3.

## U7 — OBS feed
OBS caption source setting: original or translated.
*Stories:* US-B4.

## Follow-ups
US-C4 draggable divider. More bilingual profiles.
