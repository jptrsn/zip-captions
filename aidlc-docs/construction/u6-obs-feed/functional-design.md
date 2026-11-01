# U6 — OBS Feed: Functional Design

**Status:** v1, all eight decisions approved 2026-10-13 as recommended (§10). Implemented; deviations in §11.
**Covers:** FR-P3 · Q6 · US-B4 (OBS receives the original or the translated captions) · FR-T1 (transcripts stay original).
**Size:** a small feature setting on top of a larger clean-up. The setting is one field, one action and one radio pair. The part that needs care is that OBS is fed from **two places today** and the Web Speech one can't be translated, so one of them has to go (§2, D2). The other substantive item is a latent gap in the live-line translation (§2, D4).

## 1. What OBS receives today (read from code)

| Item | Finding |
|---|---|
| Wire call | `ObsConnectionService.sendCaption(text)` → `obs.call('SendStreamCaption', { captionText })` ([obs-connection.service.ts:44](../../../packages/client/src/app/services/obs-connection/obs-connection.service.ts#L44)). It runs only while `selectObsStreamActive` is true (OBS reports the stream output as active). The call is not awaited or caught. |
| What is sent | The **live (interim) line only**. Finalized segments are never sent. When a segment is finalized the live line becomes `''`, and `''` is sent, so the caption in OBS clears at each segment end. This is existing behaviour and U6 keeps it. |
| Sender 1: Web Speech | In the recognizer's `result` handler: `if (obsConnected()) dispatch(ObsActions.sendCaption({ text: transcript }))` ([web-recognition.service.ts:229](../../../packages/client/src/app/modules/media/services/web-recognition.service.ts#L229)). It runs on **any page**, and only for the Web engine. The text is the raw recognizer string, before any translation. |
| Sender 2: stream page | `StreamCaptionsComponent` subscribes to `toObservable(liveText)` and calls `obs.sendCaption(live)` in `ngOnInit` ([stream-captions.component.ts:38](../../../packages/client/src/app/modules/peer/components/stream-captions/stream-captions.component.ts#L38)). It exists only on the Share/Stream page, while not broadcasting (`!isBroadcasting() && recognitionActive()`, [peer-landing.component.html:37](../../../packages/client/src/app/modules/peer/components/peer-landing/peer-landing.component.html#L37)). |
| Consequences | On the Web engine, the stream page sends every live update **twice**. On Azure, OBS gets captions **only** on the stream page and not while broadcasting (nothing else sends). Neither is documented as intended; both look like growth rather than design. |
| Settings | OBS settings (`ObsStudioSettingsComponent`) hold only the connection form (IP, port, password). `ObsState` holds connection and streaming flags and is not persisted. There is no OBS caption setting. |
| Translation pipeline | `CaptionTranslationService` (root) exposes `liveText`, `translatedLive`, `active` (translator supported and display mode not `off`), `target`, `sourceLanguage`. Finals and the live line each have a pipeline there. |
| Live-line translation fallback | `ChromeTranslatorService.liveOutput$` calls `translate()`, which returns **the source text** on every failure (unsupported pair, no translator, empty result, exception), plus `catchError(() => of(text))` ([chrome-translator.service.ts:58](../../../packages/client/src/app/services/translator/chrome-translator.service.ts#L58), [:341](../../../packages/client/src/app/services/translator/chrome-translator.service.ts#L341)). So `translatedLive` can hold **untranslated source text**. This also means U4's broadcast can forward that text to viewers as `translatedLive`; U4's "only real translations are forwarded" holds for finals (`translateSegmentsStrict`) but **not for the live line**. This is a U4 gap, found while reading for U6, and D4 closes it. |
| Transcripts | Both recognizers dispatch `addTranscriptSegment` with the original text, independent of OBS and translation. FR-T1 needs no change. |

## 2. OBS-side protocol limits (looked up, not guessed)

Sources were read through docs-mcp: the obs-websocket protocol reference (indexed as `obs-websocket`), and the raw `master` sources of obs-websocket, OBS Studio `libobs/obs-output.c` and libcaption (`caption.c`, `eia608.c`, `utf8.c`), fetched on 2026-10-13. A user's installed OBS may be older or newer than `master`.

| Fact | Source | Implication |
|---|---|---|
| `SendStreamCaption` "Sends CEA-608 caption text over the stream output." One field, `captionText` (string), **no documented value restrictions**. Empty text is accepted. | protocol reference; `RequestHandler_Stream.cpp` (`ValidateString(..., true)`) | Clearing the caption with `''` is valid. |
| Fails with `OutputNotRunning` unless the stream is active. | `RequestHandler_Stream.cpp` | The existing `isStreaming` gate matches the platform. Recording alone does not carry captions. |
| obs-websocket calls `obs_output_output_caption_text2(output, text, 0.0)`: display duration **0.0**, "no delay until the next caption can be sent". | `RequestHandler_Stream.cpp` | Frequent interim updates don't queue up behind a 2 s timer (the 2 s default belongs to `caption_text1`, which this path doesn't use). |
| OBS wraps the text into 32-column lines (`caption_frame_from_text` wraps with `utf8_wrap_length(data, SCREEN_COLS)`; the OBS comment says "split text into 32 character strings") and writes them into a fixed-size caption frame. Text beyond the frame is not shown. | `obs-output.c`, `caption.c` | Long sentences are cut by OBS. This is existing behaviour and U6 does not change it (no wrapping or trimming on our side). I did not verify the exact row count. |
| **Characters outside the CEA-608 character sets are silently dropped**: `caption_frame_write_char` returns without writing when `_eia608_from_utf8(c)` is 0. The sets in `eia608.c` are Basic North American, Special North American, and the extended Western European sets (Spanish/Miscellaneous/French; Portuguese/German/Danish). | `caption.c`, `eia608.c` | Arabic, Chinese, Japanese, Korean, Hindi, Russian and Ukrainian text has **no** characters in these sets, so OBS shows nothing for them. This affects the original feed too (a speaker of Arabic or Mandarin gets blank OBS captions today). Polish, Turkish and Vietnamese are partly Latin; some of their letters are likely outside the sets, but I could not read the per-letter map (the fetch tool returned nothing for `eia608_charmap.h` and the re2c file), so **I won't claim which letters**. |

Consequence for the design: nothing we send can be made to work for non-Latin scripts, so the honest approach is to **say so in the settings** (D5) and not to transliterate or substitute.

## 3. Settings model and persistence

- New optional field `obsFeed?: 'original' | 'translated'` on `TranslationSettings`, selector default `'original'` (`selectObsFeed`), so settings stored before U6 keep working, as with the U3 fields.
- New action `setObsFeed({ feed })` with a reducer case that sets `translation.obsFeed`, added to the action list of the `saveTranslationSettings$` effect, so it persists in the existing `translation` write (local storage). Translation settings are not synced to the server, so there's no server change (the U3 finding still holds).
- Why `translation` and not `ObsState`: `ObsState` is session connection state and is not persisted. The choice is a caption-content setting like `pipContent`, and it follows the same path.
- **UI:** in Settings → OBS Studio, below the connection form: a two-option radio group, *Original* / *Translated*, that dispatches `setObsFeed` immediately, as the PiP feed switch does (no Save button; the connection form keeps its own submit). The OBS tab is where a user thinking about OBS looks. Hints under the group (D5, D6) appear only when relevant.
- The sidebar and the translation settings form are unchanged.

## 4. What is sent in each case

One pure function, `resolveObsCaption`, decides, and returns the text to send or `null` for "send nothing" (the previous caption stays on screen).

| Situation | OBS receives |
|---|---|
| Feed `original` | The live line (as today). |
| Feed `translated`, translation active, live line empty | `''` (clears, as today). |
| Feed `translated`, translation active, live line translated | The translated live line. |
| Feed `translated`, translation active, live line **pending** (translation not back yet, or the model is still downloading) | Nothing (`null`). The previous caption stays. The source text is never sent in its place. |
| Feed `translated`, translation active, live translation **failed** (D4: the live line is strict, so the result is empty) | Nothing (`null`). Same as pending. |
| Feed `translated`, translation active, spoken language equals the target (pass-through) | The live line: it is already in the target language, so it is the right text. |
| Feed `translated`, translation **off** (display mode `off`) | The original live line, plus a hint that this is what happens (D3). |
| Feed `translated`, device **can't translate** (`active` false) | The original live line, plus the same hint. The stored choice is kept, so it takes effect on a device that can. |

Not sent in any case: finalized segments (the live-line-only behaviour is kept), and nothing about translation goes to the transcript (FR-T1).

## 5. Design

### 5.1 One sender: `ObsCaptionFeedService` (root)

- Reads `CaptionTranslationService` (`liveText`, `translatedLive`, `active`, `target`, `sourceLanguage`), `selectObsFeed` and the OBS connected state; combines them with `resolveObsCaption`; drops `null`; dedupes consecutive identical text; and calls `ObsConnectionService.sendCaption`. It does **not** start a second translation pipeline.
- Created in `AppComponent`'s constructor by injecting it (Angular 16: its `toObservable` calls are in the service constructor, as in `CaptionTranslationService`). It works on any page and for both engines.
- Removed: the Web Speech dispatch and its `obsConnected` signal; the `toObservable(liveText)` subscription and the injected `ObsConnectionService` in `StreamCaptionsComponent` (the component keeps its UI); `ObsActions.sendCaption` / `sendCaptionSuccess` and the `sendCaption$` effect, which nothing else uses.
- Small hardening in `ObsConnectionService.sendCaption`: catch the rejected `call()` promise (today a closed socket would raise an unhandled rejection), and also require the connection to be `connected`, because `streamingActive` is not reset when the socket closes.
- **Behaviour change to flag:** Azure users will now send to OBS from every page, not only the Share/Stream page, and the Web engine's duplicate sends go away. Both match what the OBS feature is for, but both are visible changes.

### 5.2 Live translation is strict (D4)

`ChromeTranslatorService.liveOutput$` switches from `translate()` to the strict path, so a failure yields `''` instead of the source text. Effects:
- OBS: the failed and pending cases in §4 send nothing.
- Caption view: the translated live line shows nothing instead of source text on failure. This makes the live line behave like the finals since U4 (placeholder on failure).
- Broadcast: `translatedLive` is no longer set to source text on failure, closing the U4 gap. Viewers already treat `''` as "no translated live line".

### 5.3 Language warning (D5)

A pure `obsCannotShowLanguage(code)` returns true for `ar`, `zh`, `ja`, `ko`, `hi`, `ru`, `uk` (scripts with no CEA-608 characters, §2). The settings show *"OBS stream captions use the CEA-608 format, which cannot show this language."* when the **effective** language is in that set: the translation target when the feed is `translated` and translation is active, otherwise the spoken language. Partly-Latin languages get no warning because I can't state their coverage.

## 6. i18n

New strings go into `en.json` first, one sentence per key, no `{{param}}` interpolation, then the other locales are generated with `cd scripts && python3 translate.py` (never hand-translated). No existing English value changes, so nothing needs removing from other locales first. Trailing newlines are kept as in the committed files (`en.json` has one; the others have none).

Under `CONNECTIONS`:
- `obsCaptionSource`: "Captions sent to OBS"
- `obsCaptionOriginal`: "Original captions"
- `obsCaptionTranslated`: "Translated captions"
- `obsCaptionTranslatedFallback`: "While translation is off or unavailable, OBS receives the original captions."
- `obsCaptionUnsupportedLanguage`: "OBS stream captions use the CEA-608 format, which cannot show this language."

## 7. Test plan

Component specs for the OBS settings tab and `recognition-render` fail on existing setup gaps (the OBS settings spec declares the component with no providers), so logic lives in pure helpers.

| Spec | Cases |
|---|---|
| `obs-caption.spec.ts` (new): `resolveObsCaption` | Every row of §4, including pending, failed, pass-through, translation off, device can't translate; live `''` clears in both feeds. |
| same: `obsCannotShowLanguage` | The seven non-Latin codes true; `es`, `fr`, `pl`, `tr`, `vi`, `en` false. |
| `obs-caption-feed.service.spec.ts` (new) | With stubbed `CaptionTranslationService` signals, a stub store and a stub `ObsConnectionService` (host-component fixture + `detectChanges()`, as in `caption-translation.service.spec.ts`): original feed sends the live line; translated feed sends the translation, not the source; pending sends nothing; consecutive identical text is sent once; nothing is sent when OBS isn't connected; switching the feed changes what is sent. |
| `chrome-translator.service.spec.ts` (extended) | Live translation: a failure and an unsupported pair yield `''`, not the source text. |
| `settings.reducer.spec.ts`, `settings.selector` spec, `settings.effects.layout.spec.ts` (extended) | `setObsFeed` sets the field; the selector defaults to `original`; the action triggers the whole-object `translation` write. |
| `obs-connection.service.spec.ts` (extended) | `sendCaption` swallows a rejected call; doesn't call when not connected. |
| Full suite | Compared by suite name against a `HEAD` worktree run, path prefix stripped, hung last suite killed and reported. `npx tsc -p packages/client/tsconfig.app.json --noEmit` and `npx ngc -p packages/client/tsconfig.app.json --noEmit`. |

## 8. Constraints observed

- Reuses `CaptionTranslationService`; no second pipeline; no paid or cloud translation; no language detection (parked with conversation mode).
- Angular 16: `toObservable` only in constructors (the new service).
- Azure recognizer configuration is not touched; only what OBS is sent changes.
- Spoken language (`lang` + `dialect`) is not changed; `uiLanguage` is unrelated.
- Transcripts keep storing the original only (FR-T1, Q8).
- The OBS protocol was looked up in docs-mcp (indexed `obs-websocket`; raw OBS and libcaption sources fetched through `fetch_url`). No WebFetch or curl.
- Commits: `feat(translation): …` plus `docs(aidlc): …`, Co-Authored-By trailer, not pushed.

## 9. Not verified (will be reported again at the end)

- **OBS itself, and a real stream.** Nothing here runs against a live OBS; the behaviour in §2 is read from source, and a user's OBS version may differ from `master`.
- Which Western European or Latin-extended letters (Polish, Turkish, Vietnamese) CEA-608 can show, and whether the streaming platform renders the 608 track at all.
- The caption frame's exact row limit.
- The new settings group in a browser.

## 10. Decisions (each with a recommendation)

1. **Where the setting lives.** *Recommend:* `obsFeed` in `TranslationSettings` (persisted by the existing translation write, default `original`), changed from a radio pair in Settings → OBS Studio that applies immediately. *Alternative:* put it in `ObsState` (not persisted today; would need new persistence) or in the translation settings form (further from where a user thinks about OBS).
2. **One sender, from the translation pipeline.** *Recommend:* a root `ObsCaptionFeedService` fed by `CaptionTranslationService`; remove the Web Speech dispatch, the `StreamCaptionsComponent` send and the unused `sendCaption` action/effect; harden `sendCaption` (catch, require connected). It makes OBS work from every page on both engines, which is a visible change (§5.1). *Alternative:* keep both existing senders and translate only on the stream page. That leaves the Web recognizer path unable to translate, so the setting would apply on one page only; I don't recommend it.
3. **Translated feed with translation off or unavailable.** *Recommend:* send the original captions and say so in a hint, because nothing is claimed as a translation and a live stream shouldn't go blank because a toggle is off. *Alternative:* send nothing, which is literal but silently blanks the stream; or disable the "Translated" option, which loses the stored choice on a device that can't translate.
4. **Pending and failed translations send nothing; the live line becomes strict.** *Recommend:* `liveOutput$` returns `''` on failure (as finals do since U4), and `resolveObsCaption` sends nothing while the translation is missing. This also closes the U4 live-line gap for broadcast viewers and removes source text from the translated live pane on failure. *Alternative:* a separate strict signal for OBS only, leaving the view and broadcast as they are (a second live path, and the U4 gap stays).
5. **Non-Latin scripts: warn, don't transform.** *Recommend:* show the CEA-608 warning when the effective language is Arabic, Chinese, Japanese, Korean, Hindi, Russian or Ukrainian; send the text unchanged; no transliteration. Partly-Latin languages get no warning (not verified). *Alternative:* no warning (users find out on air), or block those targets (removes a valid choice for viewers who read the stream elsewhere).
6. **Live line only, as today.** *Recommend:* keep sending only the live line (with `''` on finalize), unchanged; do not add finals or a hold-last-caption delay. *Alternative:* hold each final for a moment before clearing, which is a separate behaviour change to the existing OBS feature and not part of the original/translated choice.
7. **i18n.** *Recommend:* the five keys in §6, generated with `translate.py`.
8. **Scope.** *Recommend:* treat U6 as the small setting plus the sender consolidation and the strict live line, with the §7 tests. The duplicate-sender removal is the only part that changes behaviour beyond the new setting, and it's called out in the commit message and the audit.

## 11. Deviations from the design (found while implementing)

- `translateSegmentsStrict` gained an optional `cacheResults` argument (default `true`). The live line passes `false`, so interim lines (which change constantly) don't evict finalized segments from the 500-entry cache. The design said only that the live line becomes strict.
- Added a small pure `obsEffectiveLanguage` next to `resolveObsCaption` (the language the warning is judged on), instead of inlining it in the component.
- The radio pair in the OBS settings is not bound to a form control: `[checked]` plus `(change)` dispatch `setObsFeed`, so there's no form state to save.
- `ObsCaptionFeedService` is injected in `AppComponent`, which also constructs `CaptionTranslationService` at app start rather than at first use. Not observed to matter; not checked in a browser.
- The full suite ran to completion this time: no hang in either run.
