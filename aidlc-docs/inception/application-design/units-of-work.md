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
| FR-1, FR-3, FR-5 | Done. The single-translator thrash was fixed in U1 with a per-pair translator cache. |
| FR-2 / Q9 eligibility | Done in U0 (`3c53761`) |
| FR-4 targets | Done: 17 targets kept for Release 1 (Q3 amended) |
| FR-6 `lang`/`dir` | Done in U0 (`3c53761`) |
| FR-9, FR-AZ-* | **Gap:** the source language is always the global dialect. U1 added per-segment `lang`; U2 tags it. |
| FR-C* conversation | Deferred to Release 2 |
| FR-P1/P2 | Done |
| FR-P3 OBS feed | **Gap** |
| FR-D1, FR-D4 | Done (stacked) |
| FR-D2 orientation/swap | **Gap** |
| FR-D3 alignment | Partial: segments have IDs (U1) and the broadcaster's render is ID-aligned. Viewer alignment is U4 and placeholders are U3. |
| FR-B1, FR-B2, FR-B4, FR-B5 | **Gap** (FR-B3 done) |
| FR-W* | Partial: PiP is forced translated-only |
| NFR-7 | Done |
| Regression | `saveTranscriptionSettingsFailure` reducer handler removed. **Fixed in `2292605`**, with a reducer test. |
| **Bug** | `toObservable()` in `ngOnInit` threw NG0203 in `broadcast-render` (viewer) **and** `broadcast-room` (broadcaster; masked by a pre-existing test-setup failure). **Fixed in `2292605`**: created in the constructor. |

**Test baseline (2026-10-10):** `develop` has 46 of 96 suites failing (pre-existing missing-provider test setup: `Store`, `HttpClient`, `ActivatedRoute`, `TranslateService`, plus `webkitSpeechRecognition` undefined). The merged branch has 47 of 98 failing. The only new failure is `broadcast-render` (the NG0203 bug above), and the two new translation suites pass.

## U0 — Baseline hardening ✅ (done: `2292605`, `3c53761`)
~~Fix the NG0203 bug; restore the `saveTranscriptionSettingsFailure` handler~~ (done, `2292605`). Add eligibility gating (`'Translator' in self` and desktop; toggle disabled with an explanation; "Experimental" label). Trim the pre-release API probes down to the shipped `Translator` API. Add `lang`/`dir` on caption text. Add tests for the translator service through an adapter.
*Stories:* US-0.1, US-0.3.

**Open copy issues found in U0 (need maintainer decision):**
- ~~`privacyNotice` claimed no audio leaves the machine~~. **Fixed in `191d2da`**: the notice now says translation is on-device, plus a separate line saying speech recognition may use the cloud. Regenerated with `scripts/translate.py`.
- ~~16 GB RAM / 20 GB disk warning~~. **Fixed in `da8445b`**: the hardware probe and warning are removed, replaced by a per-language-pair model note in settings and caption views. No size figure is shown because Chrome doesn't publish pack sizes.
- *Out of scope (handled separately):* machine-translation quality of `scripts/translate.py` output.

## U1 — Caption segment model ✅
`CaptionSegment { id, text, lang }` from both engines, with `getRecognizedText()` derived from it for existing consumers. Translator cache keyed by pair (multiple live translators), not a single instance.
*Enables:* FR-9, FR-D3, FR-B1, and Release 2 conversation mode.

Design: `construction/u1-caption-segment-model/functional-design.md`. Done:
- IDs survive history rollover (`CaptionSegmentHistory`).
- Web segments use the language captured at each recognition `start`. Azure segments use the configured locale, and Azure configuration is unchanged.
- `recognition-render` translations are keyed by segment ID.
- Up to 4 translators are cached per pair, least recently used first out.
- Translated segments are cached in memory for the current session only (cleared on disconnect and when a viewer leaves), up to 500.
- Fixed: Azure `NoMatch`/empty results no longer add blank captions or empty transcript entries.
- Fixed: concurrent translator creation for the same pair.

*Noted for U4:* `broadcast-render` (viewer) still aligns by index, because the payload has no IDs.

## U2 — Bilingual-locale language tagging
`BilingualDialects` metadata. `LanguageDetector`, restricted to the pair, tags final segments. Per-segment translation source, with pass-through when source = target. Azure config is unchanged, with a regression test proving it.
*Stories:* US-AZ1–AZ3.

## U3 — Split orientation, swap & PiP content
Horizontal/vertical, pane swap, language labels. A PiP content setting (FR-W1).
*Stories:* US-C1–C3, US-W1.

## U4 — Broadcast both feeds
Versioned payload carrying `{ id, text, lang }` for both original and translated segments, plus `translations: [targetLang]`. Viewer picker merges the broadcaster's languages with local ones (FR-B4/B5). Old viewers still get `recognition` as before.
*Stories:* US-D1–D3.

## U5 — Per-language windows
**Spike first:** can two top-level windows hold Document PiP windows at the same time in Chrome? Then: a popup per language synced over `BroadcastChannel`, full-screen on any display, closing with the opener, and its own PiP window if the spike passes. Settings → "Display windows".
*Stories:* US-W2, US-W3.

## U6 — OBS feed
OBS caption source setting: original or translated.
*Stories:* US-B4.

## Release 2
**R2-U1 — Conversation mode:** language pair (interface languages only), manual Switch (finalize, then restart), automatic turns on bilingual locales, two-pane conversation view. *Stories:* US-A1–A4.

## Follow-ups
US-C4 draggable divider. More bilingual profiles.
