# U4 — Broadcast Both Feeds: Functional Design

**Status:** v1, all ten decisions approved 2026-10-12 with the recommendations as written (§10). Implemented; deviations in §12.
**Covers:** FR-B1–B5 · US-D1–D3 (and FR-D3 on the viewer, left from U3)
**Not in scope:** per-language windows (U5), OBS (U6), conversation mode (R2).

## 1. Current state (read from code, 2026-10-11)

| Item | Finding |
|---|---|
| Broadcaster | `BroadcastRoomComponent` sends two kinds of message through `PeerService.broadcastData`: `{ type: 'live', recognition: string, lang }` and `{ type: 'segment', recognition: string[], lang }`. The `segment` message is a **full snapshot** of the last 15 final segments on every change. It carries no IDs and no per-segment language, and never translated text. A third message, `hostLanguage`, and a `status` message exist. `lang` is the host's current spoken language only. |
| Where the broadcaster's translation lives | Inside `RecognitionRenderComponent` (hosted by the broadcast room page): `translationsById`, `requestedIds`, a generation counter, and the live output subscription. `BroadcastRoomComponent` cannot see any of it. |
| Viewer receive path | `PeerService._handlePeerData`: any message with both `recognition` and `type` goes to the `live` / `segment` switch, and a `lang` field overwrites `hostLanguage$`. A message of an unknown shape falls to a final branch that only `console.warn`s. The `PeerService` keeps `textOutput$: string[]` and `liveText$: string`. |
| Viewer render | `BroadcastRenderComponent` aligns by index: it replaces its whole `translatedTextOutput` array with each `translateSegments` result. It translates from `hostLang` only (no per-segment language), duplicates the whole split-view markup (stacked only, no U3 layout, placeholders or per-line `lang`/`dir`), and gates everything on `translatorService.isSupported()`. |
| Viewer eligibility gate | `translationMode` is forced to `'off'` when the device can't translate, and the sidebar's translation menu is hidden (`*ngIf="isTranslatorSupported"`). A phone viewer can therefore never see translated text, and has no control to ask for it. |
| Viewer language list | Every translation language except the host's source language, local only. Nothing marks the broadcaster's. |
| **Silent failure** | `ChromeTranslatorService.translateSegments` returns the **source text** whenever translation can't run (unsupported pair, translator unavailable, error, model not downloaded). Success and failure are indistinguishable to the caller. Today that means the local translated pane shows source text on failure. (My U3 note said the translated pane "never shows original-language text as a fallback". That holds for pending segments but not for failures.) A broadcaster that forwarded these results would send untranslated text labelled as a translation. |
| Server | Broadcast data goes peer to peer over PeerJS data connections. The server is not involved in payloads, so no server change is needed. |
| Compatibility | Old viewers ignore unknown fields on a `live` / `segment` message. They would only `console.warn` on an unknown *type*. |

## 2. Wire format (v2, additive)

v2 **extends the existing `live` and `segment` messages** with extra fields. It adds no new message types, so old viewers keep working: they read `recognition` and `lang`, and ignore the rest (FR-B2).

```ts
interface WireSegment { id: string; text: string; lang: string }          // lang: BCP 47

// segment message (full snapshot of the last 15 segments, as today)
{
  type: 'segment',
  recognition: string[],            // unchanged: original texts, for old viewers
  lang: string,                     // unchanged: host's current spoken language
  v: 2,
  segments: WireSegment[],          // same segments, with IDs and per-segment language
  translations: string[],           // languages the broadcaster offers: [] or [target]
  translated: WireSegment[],        // translations that exist so far; lang = the target; ids match `segments`
}

// live message
{
  type: 'live',
  recognition: string,              // unchanged
  lang: string,
  v: 2,
  translations: string[],
  translatedLive?: string,          // the broadcaster's translation of the live line, when there is one
}
```

- `translated` holds **only real translations**: a segment still pending, or whose translation failed (§4), is simply absent. A viewer treats an absent ID as pending.
- A segment already in the target language is sent as a translation whose text equals the original (pass-through), so the viewer shows it at once.
- `translations` is an array so a later release can offer more than one language. It has one entry today.
- The broadcaster resends the `segment` message when a translation lands, so a segment typically goes out twice (original first, then with its translation). Payloads are small (≤15 segments).
- `recognition`, `lang` and the existing message types are untouched, so a v1 viewer is unaffected.
- A new `parseBroadcastPayload` / `buildSegmentPayload` / `buildLivePayload` pair lives in `modules/peer/models/broadcast-payload.ts` as pure functions, with the wire interfaces. `PeerService` only calls them.

**New viewer, old broadcaster** (no `v`): `segments` is synthesised from `recognition` with `lang = hostLanguage`, and `translations` is `[]`. The viewer then behaves as it does today: local translation only.

**Synthetic IDs for old broadcasters** are `${text}#${n}`, where `n` counts earlier identical texts in the snapshot. They stay stable when the history rolls over (index IDs would shift every segment by one on each rollover and force full retranslation and DOM churn).

## 3. Broadcaster: owning the translation (FR-B1)

The translation state moves out of `RecognitionRenderComponent` so more than one consumer can use it.

- **`SegmentTranslationSession`** (new plain class, `services/translator/segment-translation-session.ts`): the logic that is now inline in the component. It holds `translationsById`, in-flight IDs and a generation counter; it uses `planTranslations` / `mergeTranslations`; and it takes a `translate(texts, sourceLang, targetLang)` function. It exposes the translations as a signal and has `update(segments, target)`, `reset()` and `dispose()`. It is plain TypeScript with an injected translate function, so it is unit-testable without Angular.
- **`CaptionTranslationService`** (new, `providedIn: 'root'`): the one session for the **local recognition feed**. It watches the recognized segments and the translation settings (target, mode, eligibility), drives a `SegmentTranslationSession`, also owns the translated live line (it subscribes to the translator's `liveOutput$`), and exposes `translations`, `translatedLive`, `target` and `active` signals. It must create its `toObservable` subscriptions in its constructor (Angular 16, NG0203).
- **`RecognitionRenderComponent`** becomes a consumer: its translation state and `translatePendingSegments` go away, and `translatedLines` is built from the service's signal. U3's pure helpers (`caption-lines.ts`, `caption-view.ts`) are unchanged.
- **`BroadcastRoomComponent`** reads the same service and sends v2 payloads. It offers a translation (`translations: [target]`) only when the broadcaster is eligible, translation is enabled and the mode is not `off`.
- **Viewers' local translation** reuses `SegmentTranslationSession` too (§5), as its own instance with its own translate function.

## 4. Strict translation results

A new method `ChromeTranslatorService.translateSegmentsStrict(texts, source, target): Promise<(string | null)[]>`:
- returns the translated text for each segment where translation really ran
- returns the original text when source and target are the same language (pass-through)
- returns `null` for a segment when the pair is unsupported, no translator could be created or used (including a model that still needs downloading), or translation threw.

`translateSegments` keeps its signature and behaviour for existing callers. `SegmentTranslationSession` uses the strict method and **skips `null` results**, so a failed segment stays pending. Consequences:
- the broadcaster never sends untranslated text as a translation;
- the local translated pane keeps its placeholder on failure instead of showing the source text (a visible change from today, and what the U3 design intended). The download button remains the call to action, and the existing retry triggers (model ready, settings change, next segment update) fill the slot.

## 5. Viewer (FR-B2–B5, US-D1–D3)

State from the wire: `segments` (original, with IDs and languages), `offered` (languages the broadcaster translates into), and `broadcasterTranslations` (ID → text for the offered language), plus `translatedLive`.

**Which translation a line uses**, decided by a pure function `resolveViewerTranslation(target, offered, canTranslateLocally)`:

| Viewer's chosen language | Result |
|---|---|
| In `offered` (same base language) | `broadcaster`. Use the broadcaster's text per ID; absent IDs show a placeholder. No local translation runs (FR-B5, US-D3 third case). |
| Not offered, device eligible | `local`. A `SegmentTranslationSession` on the viewer's device translates each segment from its own `lang` (FR-B3, US-D3 first case). |
| Not offered, device ineligible | `none`. The viewer's target is moved to the first offered language (decision 7), or translation stays off if nothing is offered. |

**Language picker (FR-B4):** an option group "From the broadcaster" first, listing the offered languages, then a group "Translated on this device" with the remaining languages, shown only when the device is eligible. An ineligible viewer sees only the broadcaster's group. The viewer's own spoken language and the source language are excluded, as now.

**Making it usable on ineligible devices:** the viewer's translation mode is no longer forced `off` when a broadcaster translation is in use, and the sidebar's translation menu shows whenever the device is eligible **or** the broadcaster offers translations. The menu's language-swap button stays hidden for viewers, as today.

**Layout:** the viewer adopts U3's layout (orientation, pane order, divider controls, aligned panes with placeholders, per-line `lang`/`dir` and language chips) by lifting the U3 pane markup into a shared `app-caption-panes` component (decision 8). The translated pane's controls differ (viewer: grouped picker, no language swap), so they are projected into the component through a content slot. The viewer's orientation and order come from the viewer's own saved translation settings. There is no PiP content setting on the viewer, because the viewer doesn't use PiP.

**Live line:** the viewer shows `translatedLive` when the language resolves to `broadcaster`, and runs `queueLiveTranslation` locally when it resolves to `local`.

## 6. Compatibility matrix

| Broadcaster | Viewer | Result |
|---|---|---|
| v2, translating | v2, eligible or not | Broadcaster's translation, or local for another language if eligible |
| v2, translating | v1 (old) | Original only, exactly as before; extra fields ignored |
| v2, not translating | v2 | Original; local translation if eligible; picker has no broadcaster group |
| v1 (old) | v2 | Today's behaviour: local translation only, synthetic IDs |

## 7. i18n

New `en.json` keys first, one sentence each; other locales via `cd scripts && python3 translate.py` (never by hand). The script only fills **missing** keys and writes no trailing newline, matching the committed locale files.

| Key | English |
|---|---|
| `STREAM.fromBroadcaster` | Translated by the broadcaster |
| `STREAM.translatedOnDevice` | Translated on this device |

No existing English value changes.

## 8. Test plan

Logic lives in pure functions and plain classes. The `broadcast-render` and `peer.service` component-level specs fail on the existing setup gaps (`broadcast-render` currently passes, so it is kept passing).

| Spec | Cases |
|---|---|
| `models/broadcast-payload.spec.ts` (new) | `buildSegmentPayload` keeps `recognition` equal to the original texts and `lang` as before (what an old viewer reads), and adds `segments` / `translated` / `translations`. A pending or failed segment is absent from `translated`. A pass-through segment is present. `buildLivePayload` adds `translatedLive` only when there is a translation. `parseBroadcastPayload` reads v2 exactly, and reads a v1 message into synthetic segments with the host language. Synthetic IDs are stable when the oldest segment rolls out, and distinct for repeated identical text. Unknown fields and a missing `v` are tolerated. |
| `segment-translation-session.spec.ts` (new) | Out-of-order results land on the right IDs. A `null` result leaves the segment pending and not stored. A reset discards in-flight results from the old generation. Segments that rolled out are dropped. Pass-through never calls the translate function. A changed segment `lang` retranslates. |
| `chrome-translator.service.spec.ts` (extended) | `translateSegmentsStrict`: success, same-language pass-through, unsupported pair → `null`, translator unavailable → `null`, translator throws → `null`. `translateSegments` is unchanged. |
| `services/translator/viewer-translation.spec.ts` (new) | `resolveViewerTranslation` for all three rows of the §5 table, base-language matching (`fr-CA` vs `fr`), and the picker lists: the broadcaster group first, the local group only for eligible devices, and exclusions. Coercion of an unavailable target to the first offered language. |
| `caption-translation.service.spec.ts` (new) | With stub recognition and translator: translations are produced for the active target, none when mode is off or the device is ineligible, and the live line is exposed. If the service can't be constructed under the existing providers, the logic stays in the session class and the service is a thin shell. |
| `recognized-text` / `caption-lines` (extended) | Nothing new needed; U3 coverage applies. |
| `broadcast-render.component.spec.ts` | Stays passing. A case is added if it can use providers only: v2 payload shows the broadcaster's translated line for a matching language. |

**Pass criteria:**
- `npx jest -c packages/client/jest.config.ts --ci --forceExit`, output to a log: **no new failing suites**, compared by name against the baseline (44 of 109 failing after U3). Run a `HEAD` worktree baseline the same way; a run may hang with idle workers, so kill and rerun.
- `npx tsc -p packages/client/tsconfig.app.json --noEmit` and an `ngc` template check are clean.
- New unit tests for: payload build/parse (including old-viewer compatibility), the strict translation path, the session class, and the viewer resolution rules.

## 9. Constraints observed

- **Angular 16:** the new service and the viewer create their `toObservable()` calls in constructors or field initializers, and no signal is written synchronously inside an effect or a `toObservable` callback.
- **Azure recognizer configuration** is not touched, and no language detection is added. Per-segment `lang` is what the engines already provide.
- **Translation** stays on Chrome's on-device `TranslatorApiAdapter`, and no cloud service is introduced. The broadcaster's translated text travels peer to peer with the original text, as the original text does today.
- **No new platform facts** are needed (PeerJS data connections are existing behaviour), so no new docs lookups.
- **Transcripts** and the OBS feed are not changed.

## 10. Decisions for approval

Each has a recommendation. Reply "approve" to take them all, or list changes.

1. **Additive wire format.** Extend the existing `live` / `segment` messages with `v: 2` and new fields, keeping `recognition` and `lang` as they are. *Recommend this.* The alternative is new message types for v2 plus legacy messages, which doubles traffic and makes old viewers log "UNHANDLED DATA" warnings.
2. **IDs for old broadcasters.** Synthetic `${text}#${n}`. *Recommend this.* The alternative is index-based IDs, which shift on every history rollover.
3. **Who owns the broadcaster's translation.** Extract `SegmentTranslationSession` plus a root `CaptionTranslationService`, and make `recognition-render` a consumer. *Recommend this.* It means one translation pipeline, with `broadcast-room` and the viewer reusing it. The alternative is to let `broadcast-room` translate independently, which is a smaller change but duplicates the logic and does the Chrome work twice on the broadcaster's machine.
4. **Strict translation results.** Add `translateSegmentsStrict`, so failures are `null`, the broadcaster never forwards untranslated text, and the local translated pane keeps its placeholder on failure instead of showing source text. *Recommend this.* The alternative is to forward whatever `translateSegments` returns and accept untranslated text labelled as a translation.
5. **Live line.** The broadcaster sends `translatedLive`. *Recommend yes.* Without it, viewers see a translated history but an original-language live line in split view.
6. **Viewer picker and gate.** A "from the broadcaster" group first, a local group only for eligible devices, and the translation menu available to ineligible viewers whenever the broadcaster offers a language. No auto-selection: the viewer chooses. *Recommend this.* The alternative is to auto-switch a viewer to the broadcaster's language when one is offered, which overrides a viewer who just wants the original.
7. **Unavailable target.** When an ineligible viewer's saved target isn't offered, move it to the first offered language (or keep translation off if none). *Recommend this.* The alternative is to leave the saved target and show placeholders forever.
8. **Viewer layout.** Lift the U3 pane markup into a shared `app-caption-panes` component and migrate `broadcast-render` to it, so viewers get orientation, pane order, aligned panes, placeholders and per-line `lang`/`dir`. *Recommend this.* The alternative is a smaller change that leaves the viewer's duplicated stacked-only markup, so a viewer's saved orientation is ignored and old and new panes diverge further.
9. **Late joiners.** A viewer who joins mid-session sees nothing until the next recognition update (existing behaviour). *Recommend leaving this out of U4* and listing it as a follow-up. The fix (replay the last payload after a connection is validated) is small, but it changes connection handling that this unit otherwise doesn't touch.
10. **One offered language for now.** `translations` is an array, but the broadcaster offers only its current target. *Recommend this.* Multiple simultaneous targets would multiply translation work on the broadcaster's device.

## 12. Deviations and findings during implementation

- **`toObservable` in `ngOnInit` (caught by the new viewer spec).** My first viewer rewrite created one in `ngOnInit` and threw NG0203. It is now in the constructor, as the brief requires.
- **`app-caption-panes` is also used by the broadcaster's `recognition-render`**, not only the viewer. The PiP container, `#captionContainer` and the sidebar stay in the parents. The translated-pane controls and the divider controls are projected (`translatedControls`, `dividerControls`).
- **Picker labels:** the "Translated on this device" group label only appears when the broadcaster also offers languages. With nothing offered, the local languages are listed flat, as before.
- **Settings emission:** `CaptionTranslationService` watches `active|target`, not the whole translation settings object, so pane swaps and orientation changes (which share that object since U3) no longer retranslate. The initial emission still retranslates segments that already exist when the service is first created; the segment cache makes that cheap.
- **`recognition-render`'s model-status check** now runs when the spoken/target language pair changes (it used to run on any translation setting change).
- **Failed translations** keep their placeholder in the local translated pane (decision 4). They are retried when the next segment update or a ready model triggers planning, and the existing unsupported-pair shortcut keeps repeated attempts cheap.
- **Server:** no change; payloads are peer to peer.
- **Not tested end to end:** the payload builders/parsers, the session, the service, the resolution rules and the viewer component are unit tested. A real two-browser PeerJS session, Chrome's Translator API, and the visual layout were not run.

## 11. Out of scope

- A PiP setting for viewers; viewers don't use PiP.
- Replaying state to late joiners (decision 9).
- Multiple simultaneous broadcast languages (decision 10).
- Per-language windows (U5) and the OBS feed (U6).
