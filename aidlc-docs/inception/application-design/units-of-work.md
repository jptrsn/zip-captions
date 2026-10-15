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
| FR-9, FR-AZ-* | Done for user-set languages (U2): segments translate from their own `lang`. Detection-based tagging (FR-AZ-3/4) is parked to R2-U1. FR-AZ-1/2/5 are done. |
| FR-C* conversation | Deferred to Release 2 |
| FR-P1/P2 | Done |
| FR-P3 OBS feed | Done in U6 |
| FR-D1, FR-D4 | Done (stacked) |
| FR-D2 orientation/swap | Done in U3 (caption view) and U4 (broadcast viewer) |
| FR-D3 alignment | Done: IDs (U1), placeholders (U3), viewer by ID (U4) |
| FR-B1, FR-B2, FR-B4, FR-B5 | Done in U4 (FR-B3 was already done in the baseline) |
| FR-W1 | Done in U3 (PiP content setting) and U5 (switch inside the PiP window). FR-W2–W5 are in the backlog (U5 spike: one PiP at a time; FR-W3b dropped). |
| NFR-7 | Done |
| Regression | `saveTranscriptionSettingsFailure` reducer handler removed. **Fixed in `2292605`**, with a reducer test. |
| **Bug** | `toObservable()` in `ngOnInit` threw NG0203 in `broadcast-render` (viewer) **and** `broadcast-room` (broadcaster; masked by a pre-existing test-setup failure). **Fixed in `2292605`**: created in the constructor. |

**Test baseline (2026-10-10):** `develop` has 46 of 96 suites failing (pre-existing missing-provider test setup: `Store`, `HttpClient`, `ActivatedRoute`, `TranslateService`, plus `webkitSpeechRecognition` undefined). The merged branch has 47 of 98 failing. The only new failure is `broadcast-render` (the NG0203 bug above), and the two new translation suites pass.

**Current test baseline (after U2, `260411d`):** 45 of 106 client suites failing, all pre-existing. Compare by **suite name**, not count: strip the ` (12.3 s)` timing suffix Jest adds to slow suites before diffing. The list of failing suites is reproducible by running the suite at the previous commit in a scratch `git worktree` with `node_modules` symlinked. A full run takes 5–10 minutes. Once, a run hung with idle workers at 0% CPU and no output; killing it and rerunning fixed it. Write output to a log rather than piping through `sort`, so progress is visible.

**Current test baseline (after U3):** 44 of 109 client suites failing. Compared by name against a `HEAD` (`2c6eda7`) worktree run: **no newly failing suite**. (The baseline run hung on its last suite and was killed, so one suite, `leave-session`, has no baseline result; it passes now. `recognized-text.component.spec` and `wake-lock-enabled.component.spec` failed in that baseline run and pass now; the first was rewritten, the second is unrelated and probably order-dependent.) Hangs with idle workers happened twice this unit; kill and rerun.

**Current test baseline (after U4):** 44 of 113 client suites failing. Compared by name against a `HEAD` (`26312a9`) worktree run: **no newly failing suite** caused by U4. The baseline run hung again near the end and was killed, so `room-card` and `third-party-connections` have no baseline result. `room-card` fails on a missing `HttpClient` provider in its own spec (a file U4 doesn't touch, and it failed in the earlier baselines too); `third-party-connections` passes. `peer-server-status-chip` failed in the baseline run and passes now (unrelated, probably order-dependent).

**Current test baseline (after U5):** 44 of 113 client suites failing. Compared by name against a `HEAD` (`095144b`) worktree run, after stripping the path prefix (the two runs print different prefixes, so a first comparison without normalising shows every suite as new): **no newly failing suite**. The baseline run hung on its last suite again and was killed, so `save-to-server-dialog` has no baseline result; it fails on a missing `TranslateService` provider in its own spec, a file U5 doesn't touch.

**Current test baseline (after U6):** 44 of 115 client suites failing. Compared by name against a `HEAD` (`0a0a878`) worktree run, path prefix stripped: the same 44 fail on both sides, **no newly failing suite**. The baseline run completed without a hang.

**Test patterns that work around the pre-existing setup gaps:**
- Engines: stub `globalThis.webkitSpeechRecognition` with a fake `EventTarget` (see `web-recognition.service.spec.ts`).
- The Azure SDK: `jest.mock('microsoft-cognitiveservices-speech-sdk')` (see `azure-recognition.service.spec.ts`).
- The `RecognitionService` facade: provide stub engines.
- Component logic (for example `recognition-render`, which still fails on `webkitSpeechRecognition`): extract it into pure helpers (`segment-translations.ts`) and test those.
- Root services built on `toObservable`: their effects run during change detection, so create a trivial host component fixture and call `detectChanges()` between steps (`TestBed.flushEffects` and `ApplicationRef.tick()` don't flush them in this Angular version). See `caption-translation.service.spec.ts`.

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

## U2 — Language pair controls ✅ *(rescoped 2026-10-10)*
The user sets the spoken language (any supported dialect, independent of the UI language) and the translation language, and can swap the two. A swap takes effect mid-session on both engines; this fixes Azure `setLanguage` silently stopping. Per-segment translation source, with pass-through when source = target. The language Azure reports is honoured when present, and Azure config is unchanged. Model deletion is not possible: the Chrome API has no delete method.
*Stories:* US-AZ1 (regression guard); swap is new.
*Parked to R2-U1:* `LanguageDetector`-based tagging (US-AZ2 detection, FR-AZ-3/4).

Design: `construction/u2-bilingual-language-tagging/functional-design.md` (v3). Done:
- "Language" is renamed **Spoken language** and stays bound to recognition. A new optional **Interface language** setting defaults to "Same as spoken language"; it's synced through the server schema field `uiLanguage`.
- Swap in the translation settings, caption view and sidebar (hidden for broadcast viewers). The dialect last used for each language is remembered.
- Mid-session language changes now take effect on Web Speech (restart) and Azure (fixes the silent stop).
- Segments translate from their own `lang`, and segments already in the target language pass through.
- Azure `result.language` is honoured when present.
- Bilingual hint added, plus a "Chrome manages models" note with a link to Chrome's model-management page.

## U3 — Split orientation, swap & PiP content ✅
Horizontal/vertical, pane swap, language labels. A PiP content setting (FR-W1).
*Stories:* US-C1–C3, US-W1.

Design: `construction/u3-split-orientation-pip/functional-design.md` (ten decisions approved as recommended; deviations in §14). Done:
- **Settings** (persisted in `translation`): `splitOrientation` (`vertical` stacked by default, or `horizontal` side by side), `paneOrder` (`original-first` | `translated-first`) and `pipContent` (`original` | `translated` | `split`, default `translated`). All optional, with selector defaults, so settings stored before U3 keep working.
- **Pane swap ≠ language swap.** New `swapCaptionPanes` toggles `paneOrder` only and never touches a language. U2's `swapTranslationLanguages` is unchanged and leaves the pane order alone. Controls: a cluster on the divider (inside the caption container, so it works in PiP), the sidebar, and the settings form (orientation and PiP content).
- **Layout:** one `captionView` (`original` | `translated` | `split`) from `resolveCaptionView`, replacing `effectiveTranslationMode`. Split panes render in `paneOrder` (DOM order follows visual order), stacked or side by side, in full-screen and PiP. Panes are `role="region"` with labels.
- **Placeholders (FR-D3):** the translated pane has exactly one line per segment, so line N is the same segment in both panes. A pending translation is a placeholder (pulsing "…", static under reduced motion, `aria-hidden`) that the translation later fills in place, because lines are tracked by segment ID. Segments already in the target language resolve without a translator call. Both panes now have equal length, which fixes the `renderHistory` slice picking different segments in each pane.
- **Per-line `lang`/`dir` (FR-6):** `app-recognized-text` takes a new `lines` input (`CaptionLine`), with `textOutput` still accepted for the viewer. An English line in an Arabic pane renders left to right.
- **Labels:** each pane label shows the current language. After a language swap, the original pane marks older lines in another language with a small chip. The translated pane needs none, because the whole history is re-translated to the new target.
- **i18n:** 10 new keys, plus `modeSplit` / `modeSplitDesc` relabelled ("Horizontal Split" described the stacked layout). All locales regenerated with `scripts/translate.py`.
- **Server:** the server `UiSettings` schema has no `translation` field, so translation settings don't sync. Nothing to add.

*Left for U4:* `broadcast-render` (viewer) keeps its own stacked split, ignores orientation and pane order, and is still index-aligned (no payload IDs). When it gets IDs, lift the pane markup into a shared component.

## U4 — Broadcast both feeds ✅
Versioned payload carrying `{ id, text, lang }` for both original and translated segments, plus `translations: [targetLang]`. Viewer picker merges the broadcaster's languages with local ones (FR-B4/B5). Old viewers still get `recognition` as before.
*Stories:* US-D1–D3.

Design: `construction/u4-broadcast-both-feeds/functional-design.md` (ten decisions approved as recommended; deviations in §12). Done:
- **Wire format v2 (additive):** the existing `live` and `segment` messages keep `recognition` and `lang` and gain `v: 2`, `segments` (`{id,text,lang}`), `translations` (languages offered), `translated` and `translatedLive`. A v1 viewer ignores the extra fields. A v2 viewer reads a v1 broadcaster with synthetic IDs (`text#n`, stable across rollover). Pure builders and parsers are in `modules/peer/models/broadcast-payload.ts`.
- **Broadcaster (FR-B1):** a root `CaptionTranslationService` owns the translation of the local recognition feed (a reusable `SegmentTranslationSession`), and both `recognition-render` and `broadcast-room` consume it. The room sends the translation only when translation is active, and only translations that really exist.
- **Strict translation:** new `translateSegmentsStrict` returns `null` for a segment that couldn't be translated. `translateSegments` still returns the source text on failure and is unchanged. The local translated pane now keeps its placeholder on failure instead of showing source text.
- **Viewer (FR-B2–B5):** `resolveViewerTranslation` prefers the broadcaster's translation when it offers the chosen language (no double translation), else translates on the device if eligible, else moves the viewer to the first offered language. The picker lists the broadcaster's languages first. An ineligible viewer (a phone) can now show the broadcaster's translation, with the translation menu available. Viewer-side local translation (FR-B3) uses its own session and each segment's own language.
- **Viewer layout:** the U3 pane markup is lifted into a shared `app-caption-panes` component used by both the caption view and `broadcast-render`, so viewers get orientation, pane order, aligned panes with placeholders, and per-line `lang`/`dir`.
- **i18n:** 2 new keys (`STREAM.fromBroadcaster`, `STREAM.translatedOnDevice`), generated with `scripts/translate.py`.
- **Server:** no change; broadcast payloads are peer to peer.

*Left out (follow-up):* late joiners see nothing until the next recognition update (existing behaviour). One offered language at a time (the `translations` array allows more later).

## U5 — PiP feed switch ✅ *(rescoped 2026-10-12 from "Per-language windows")*
**Spike (Chrome 154):** a second Document PiP window, opened from another top-level window, closes the first, so only one PiP exists at a time. A PiP window per popup (FR-W3b / US-W3) is dropped. The human rescoped U5 to the PiP itself.

Design: `construction/u5-per-language-windows/functional-design.md` (v2, six decisions approved as recommended). Done:
- A three-way switch **inside the PiP window**: spoken language, translated language, both (`EN`, `ES`, `EN+ES`). It dispatches the existing `setPipContent`, so the choice persists and the sidebar and Settings agree. The sidebar isn't in the PiP window, so before this the feed could only be changed from the main window.
- Shown only while the PiP is open and translation is on (`showPipFeedSwitch`). Top centre, extra-small buttons, same idle fade as the other overlays. No new setting, action, effect or i18n string.
- "Both" is the existing `split` option (stacked by default, with the divider cluster): the simple dual-language display. 

*Backlog:* per-language popup windows over `BroadcastChannel`, full screen on any display, "Display windows" setting, closing popups with the main window (FR-W2, W3a, W4, W5 · US-W2; draft design `construction/u5-per-language-windows/backlog-popup-windows-design.md`), and a purpose-built dual-language display.
*Stories:* US-W1 (completed).

## U6 — OBS feed ✅
OBS caption source setting: original or translated.
*Stories:* US-B4.

Design: `construction/u6-obs-feed/functional-design.md` (eight decisions approved as recommended; deviations in §11). Done:
- **Setting:** `obsFeed` (`original` | `translated`, default `original`) in `TranslationSettings`, changed from a radio pair in Settings → OBS Studio, persisted by the existing translation write.
- **One sender:** a root `ObsCaptionFeedService` reads `CaptionTranslationService` and sends the live line (original, or its translation) on any page and for both engines. The Web Speech dispatch, the stream component's send and the unused `sendCaption` action/effect are removed. `sendCaption` requires a connected socket and catches a rejected call.
- **What OBS gets:** the translation on the translated feed; nothing while it is pending or failed; the original while translation is off or the device can't translate (with a hint). Never the source text as a translation. Transcripts are untouched (FR-T1).
- **Strict live line:** `liveOutput$` yields `''` instead of the source on failure. This also closes a U4 gap (broadcast `translatedLive` could carry source text).
- **CEA-608 limit:** a warning when the language OBS would receive is Arabic, Chinese, Japanese, Korean, Hindi, Russian or Ukrainian (no characters in OBS's sets; the text is sent unchanged).
- **i18n:** 5 keys, generated with `translate.py`.

*Left out:* sending finals or holding a caption before clearing it (existing behaviour kept); a per-letter CEA-608 check for partly-Latin languages.

## Release 2
**R2-U1 — Conversation mode:** language pair (interface languages only), manual Switch (finalize, then restart), automatic turns on bilingual locales, two-pane conversation view. **Includes automatic language detection** (`LanguageDetector` tagging for bilingual locales, FR-AZ-3/4), parked from U2 on 2026-10-10. *Stories:* US-A1–A4.

## Follow-ups
US-C4 draggable divider. More bilingual profiles.
**U9 — Client test debt (client suite done 2026-10-14):** design `construction/u9-client-test-debt/functional-design.md`; all 44 failing client suites fixed (#151, merged; 123 of 123 pass); the 8 failing server suites fixed in #152 (12 of 12 pass, 165 tests) with the defects they exposed; the CI test job is #153 (`.github/workflows/test.yml`; the lock file was repaired for npm 11 to make `npm ci` work). Earlier note: **Test debt (proposed 2026-10-13):** fix the 44 failing client suites, grouped by cause, so regressions in those components are visible. See `construction/backlog-test-debt.md`.
**U8 — Settings persistence ✅ (bug, 2026-10-13):** `transcription` and `translation` were sent on "Save current" but dropped by the server schema. Design: `construction/u8-settings-persistence/functional-design.md` (all decisions approved as recommended; deviations in §10). Done: typed `transcription`/`translation` sub-documents on the server schema (plain strings, no `_id`); the Sync tab's `settingsMatch` is now a pure helper (current keys only, saved-or-default, order-insensitive); `PRIVACY.4.6` removed from 11 locales and `privacy.component.ts` (human-confirmed). Backlog: `construction/backlog-settings-persistence.md`.
**U10 — Authenticated socket identity (release-blocking; implemented 2026-10-14, merged as #154; production must run `SOCKET_AUTH_MODE=enforce`, see `construction/backlog-socket-auth-enforce.md`):** design `construction/u10-socket-identity/functional-design.md` (D1–D10 approved as recommended; D8: PeerJS out of scope). A socket's user id now comes from a handshake credential (login JWT, or a server-signed anonymous token), not from the `setId` payload. `SOCKET_AUTH_MODE` `report` (default) then `enforce`; the release gate is `enforce` in production. **U11 — PeerJS server identity (follow-on, not release-blocking; implemented 2026-10-15, merged as #156):** design `construction/u11-peer-identity/functional-design.md` (P1–P10 approved as recommended). The socket server issues a signed 1-hour peer token for the id it registered a socket under; the peer server registers an id only for a token naming it (`PEER_AUTH_MODE` `report` default, then `enforce`; roll out after `SOCKET_AUTH_MODE=enforce`); a viewer takes captions only from the room's host. Pre-existing and identical on `main`, so it does not block the release.
**U12 — Release candidate and ephemeral Azure staging (design approved 2026-10-15; pipeline written, not yet run):** design `construction/u12-release-and-staging/functional-design.md`. The homelab staging server is gone; staging is now an environment on Azure that exists only while a release candidate does (MongoDB container, own Static Web App, `next` / `next-api.zipcaptions.app`, DNS updated by hand per candidate), created by pushes to `release/**` and removed when the branch is deleted. Files: `infra/staging/` (Bicep template and runbook), `.github/workflows/deploy-staging.yml`, `teardown-staging.yml`. Then the release itself: `git flow release start v0.5.0`, tag `v0.5.0-rc.1`.
