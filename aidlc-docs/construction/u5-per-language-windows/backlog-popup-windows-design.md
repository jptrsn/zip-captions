# U5 — Per-Language Windows: Functional Design

**Status: BACKLOG, not approved and not built.** Kept for the deferred projector use case (FR-W2, FR-W3a, FR-W4, FR-W5, US-W2). U5 was rescoped to PiP-only on 2026-10-12 (see `functional-design.md`). The spike result in §1 still holds and is the reason FR-W3b / US-W3 stay dropped. Draft v1, written before the rescope; its decisions in §12 were never answered.
**Covers:** FR-W2, FR-W3a, FR-W4, FR-W5 · US-W2. **FR-W3b / US-W3 are dropped by the spike (§1).**
**Not in scope:** OBS feed (U6), conversation mode (R2), a PiP window per popup (§1), remembering popup positions, original-only popups while translation is off (§12.9).

## 1. Spike result and what it implies

Run by the human on 2026-10-12 in Chrome 154.0.8037.98 (macOS 15.7.5, arm64); recorded in `audit.md`.

| Fact | Source |
|---|---|
| Opening a Document PiP window from a second top-level window (the popup) closed the PiP window held by the first, and the reverse. `requestWindow()` was never rejected. | Human's observation, both orders |
| `documentPictureInPicture.window` is per window: it was `null` in a window while the *other* window's PiP was open. | Log |
| `requestWindow()` needs a user gesture; the Chrome guide says nothing about several top-level windows. | docs-mcp `document-pip` |

**Caveat:** the pasted log shows the first PiP's `pagehide` arriving 11.7 s late in one order, and no overlap at all in the other. I read the result as "closed at once, event delivered late to the backgrounded popup" because that is what the human saw. A one-line re-test (poll `pipWindow.closed`) would settle it.

**Implications**
- **FR-W3b / US-W3 are dropped.** A popup is a normal window with no PiP button. Single PiP stays what it is today: the main window's caption area, showing `pipContent` (U3).
- Nothing in this design depends on that, and nothing prevents adding a PiP button to the popup later if a re-test proves otherwise.
- A user who wants something floating *and* a second feed uses PiP (split or one feed) for the floating one and a popup on the other display for the second feed.
- The requirements, stories and `units-of-work.md` are updated when this design is approved (§11).

## 2. Current state (read from code, 2026-10-12)

| Item | Finding |
|---|---|
| App shell | `AppComponent` always renders `app-header`, `router-outlet`, `app-footer`, the offline warning and the service-worker notice. Its constructor dispatches `AuthActions.validate()` (an HTTP `login()`; on success also `RecognitionActions.loadEngine()`) and, for a logged-in user with transcripts on, `initTranscriptDB`. A second app instance in a popup would repeat all of it. |
| Routes | `''` (Home), `settings`, `stream`, `auth`, `user`, … There is no chrome-less route. |
| Caption area | `app-caption-panes` is presentational. It needs signals for `connected`, `error`, `renderHistory`, `hasLiveResults`, `hasTranslatedResults`, `originalLines`, `translatedLines`, `liveText` and `translatedLiveText`, plus view/orientation/order/labels. It does not touch the store or the recognition services. |
| Typography | `app-recognized-text` and `app-recognized-live-text` read `textSize`, `lineHeight` and `fontFamily` from the store; the pane text-flow comes from `textFlow`. A popup's own store is initialised from `localStorage['settings']` by `initSettings` at boot, so a new popup already has the saved typography. |
| Persistence | Settings live in `localStorage['settings']` (`StorageService`). Each setting action has an effect that does `storage.update('settings', key, value)`, which reads the whole object, changes one key and writes it back. |
| Translation | `CaptionTranslationService` (root) owns the local feed's `segments`, `translations`, `liveText`, `translatedLive`. Injecting it constructs `RecognitionService`; the popup must not do that. |
| Full screen | `FullScreenService` calls `requestFullscreen()` on a registered element, with no display choice. |
| PiP | `DocumentPipService` moves the registered caption container into one PiP window. |
| i18n | `translate.py` has no placeholder protection, and `en.json` has no `{{param}}` string anywhere. |
| `BroadcastChannel` | Not used anywhere in the client yet. |

## 3. Architecture

```
 main window (the only one with recognition)               popup window (one feed)
 ───────────────────────────────────────────               ───────────────────────
 RecognitionService → CaptionTranslationService
            │ signals (segments, translations, live…)
            ▼
 CaptionWindowService (root) ──── BroadcastChannel ────▶ CaptionWindowBridge (root, popup only)
   • open(feed) / closeAll()      'zip-captions-windows'     • signals rebuilt from messages
   • publishes state, live,                                  ▼
     settings, heartbeat, bye                              CaptionWindowComponent  (route /caption-window)
   • tracks open popups (hello/closed)                       └ app-caption-panes (view = feed)
```

- The popup never injects `RecognitionService`, `CaptionTranslationService` or `ChromeTranslatorService`. It has no pipeline, no microphone and no translator (FR-W2: "no second recognition or translation run").
- The popup's own copy of the store is used for display settings only (typography, theme, interface language, layout).

## 4. Message protocol (`BroadcastChannel`)

One channel, `'zip-captions-windows'`. Every message is a small JSON object `{ v: 1, opener: string, type, … }`.

- **`opener`** is a random ID the main window generates at load and puts in each popup's URL (`?opener=<id>&feed=original|translated`). Both sides ignore messages with another `opener`, so two main windows (two tabs) don't mix feeds. A main window with no popups open never posts anything.
- `v` lets a later release change the format; a receiver ignores unknown `v` or `type`.
- Payloads reuse U4's `WireSegment { id, text, lang }` and the pure builders in `broadcast-payload.ts`, so the popup turns snapshots into lines with the existing `buildOriginalLines` / `buildTranslatedLines`.

| Direction | Type | Fields | When |
|---|---|---|---|
| popup → main | `hello` | `popupId`, `feed` | popup loaded (or reconnecting) |
| popup → main | `closed` | `popupId`, `feed` | popup `pagehide` |
| main → popups | `state` | `seq`, `segments`, `translated`, `sourceLang`, `targetLang`, `connected`, `paused`, `error?` | recognition segments or translations changed; also the reply to `hello` |
| main → popups | `live` | `seq`, `live`, `translatedLive` | the interim line changed |
| main → popups | `settings` | `seq`, a display-settings snapshot (§6) | a display setting changed; also the reply to `hello` |
| main → popups | `heartbeat` | `seq` | every 2 s while at least one popup is registered |
| main → popups | `ready` | – | main window finished loading (opener reload) |
| main → popups | `bye` | – | main window `pagehide` |
| main → popups | `close` | `feed?` | the user chose "Close language windows" |

**State, not events.** `state` is a full snapshot (at most 15 segments, as in the broadcast payload), so it is idempotent: a lost or duplicated message can't corrupt the popup, and a popup that opens late or an opener that reloads recovers from the next snapshot. `seq` (per opener, increasing) lets the popup drop an older message that arrives out of order. The frequent interim `live` line travels separately so the history isn't resent on each word.

**Getting the current state when a popup opens.** The popup posts `hello`; the main window replies at once with `state`, `live` and `settings`. The popup shows "Waiting for the main window…" until the first `state` arrives. If no reply comes within 5 s (the main window is gone), it shows the message and the lifecycle rules below apply.

**Opener reload.** On `pagehide` the main window posts `bye`. Popups stay open and show "Reconnecting…" for a grace period of 10 s. The reloaded main window posts `ready`; each popup answers with `hello`, which re-registers it, and receives the snapshots. If nothing arrives before the grace period ends, the popup closes itself. The popup list isn't persisted: after a reload the main window learns of its popups only from their `hello`.

**Finding out the opener closed.** Three signals, strongest first: `bye` (starts the grace timer); no `heartbeat` for 6 s (a crash, or a `bye` that never sent), which starts the same timer; and `window.opener` being closed is *not* used, because it is unreliable across reloads. Closing a popup uses `window.close()`, which Chrome allows for a window opened by script.

**Closing popups from the main window.** The main window has no reliable reference after a reload, so "Close language windows" posts `close`; each popup calls `window.close()`. `window.open` returns a `WindowProxy` that is used only to detect a blocked popup and to `focus()` an existing one.

## 5. How a popup renders

- **Route** `/caption-window` (lazy module `CaptionWindowModule`), inside `AppComponent`. `AppComponent` recognises the route from `location.pathname` at construction (before the first navigation) and, in that mode:
  - hides the header, footer, offline warning and service-worker notice;
  - **skips `AuthActions.validate` and the transcript-database effect** (no HTTP login, no `loadEngine`, no second transcript DB; without a user ID that effect does nothing). `initAppearance` and `initSettings` still run, because they only read `localStorage`. I haven't read `checkUserAgent`'s effect in full; the implementation step checks it and skips it too if it touches anything but the store.
- **`CaptionWindowBridge`** (root, used only by the popup) owns the channel and exposes the signals `app-caption-panes` needs: `connected`, `error`, `hasLiveResults`, `hasTranslatedResults`, `liveText`, `translatedLiveText`, `originalLines` and `translatedLines` (built from the last `state` with the U3 builders, so per-line `lang`/`dir` and pending placeholders work), plus `sourceLang` / `targetLang`. Its channel subscriptions and any `toObservable` are created in the constructor (Angular 16, NG0203).
- **`CaptionWindowComponent`** renders one `app-caption-panes` with `view = feed` (`'original'` or `'translated'`), `renderHistory` and `textFlow` from the store, and a small control bar (full-screen, §9) that fades with pointer idle like the main window's controls. It sets `document.title` to the feed's language name and `<html lang>`/`dir` from the feed.
- **Not shown in a popup:** the sidebar, the language select and swap, the layout/divider controls, the download button and model progress (these act on the main window's pipeline). A translated feed whose translation is pending shows U3's placeholder; a model that needs downloading shows the same placeholder, and the main window keeps the download button.
- **Panes and labels** use the existing `SETTINGS.TRANSLATION.paneOriginal` / `paneTranslated` region names.
- **A popup never owns a feed's language.** Its content follows the main window: if the user swaps the languages or changes the target there, the translated popup re-renders in the new target through the next `state`.

## 6. Typography and other display settings reach the popup

Options: (a) the popup reads the saved settings; (b) the main window sends them over the channel.

- **Initial values: (a), free.** `initSettings` already reads `localStorage['settings']` when the popup boots, so the first paint uses the saved typography.
- **Live changes: (b).** `localStorage` is shared, but a popup that *dispatched* the existing setting actions would run their persistence effects and write the same key back; two windows doing read-modify-write on `settings` can drop each other's changes. Reading via the `storage` event would avoid writes but would re-init the popup's whole state from a file the main window is still updating.
- **Chosen:** the `settings` message carries a snapshot of the display-relevant fields — `theme`, `lang`, `uiLanguage`, `textSize`, `lineHeight`, `textFlow`, `fontFamily`, `renderHistory` and the translation layout fields (`splitOrientation` and `paneOrder` aren't needed by a single-feed popup, so they are left out). The popup applies it with a **new reducer-only action** `applyRemoteSettings`, which no effect listens to. The popup therefore **never writes `localStorage`**, and the main window remains the only writer.
- The main window sends `settings` when one of those fields changes, using a selector over exactly those fields (not the whole `translation` object), so a pane swap or a mode change doesn't trigger it.
- The popup applies the theme and interface language through `AppComponent`'s existing effects (they read the store).
- A change made directly in a popup is impossible (it has no controls for them).

## 7. Settings model and persistence ("Display windows", FR-W5)

```ts
export type DisplayWindows = 'single' | 'separate';   // default 'single'

interface TranslationSettings {
  // existing …
  displayWindows?: DisplayWindows;   // optional: settings stored before U5 don't have it
}
```

- **Default `'single'`** (`DefaultDisplayWindows`), with a `selectDisplayWindows` selector that supplies it, as for the U3 fields.
- **Action** `setDisplayWindows({ displayWindows })` (reducer + added to the `saveTranslationSettings$` action list, which already writes the whole `translation` object). `saveTranslationSettings` accepts the field so the settings form saves it in one dispatch.
- **Meaning**
  - `single`: today's behaviour. One window; `mode` chooses split or translated-only, and `pipContent` chooses what PiP shows.
  - `separate`: **the main window shows the original feed** and each language is opened in its own popup on request. `mode` is kept in the settings but not used while `separate` is selected.
- **`resolveCaptionView`** gains a fourth argument: `displayWindows === 'separate' && !pipActive` → `'original'`. PiP is unchanged (it still shows `pipContent`), so a presenter can float the translation over other apps *and* send the original to a popup, or the other way round.
- Translation stays active in `separate` mode (the popup needs the translations), so `CaptionTranslationService.active` is unchanged: it depends on `mode !== 'off'`.
- **Where it is set:** Settings → Translation, "Display windows" radio group (saved with the form), and the sidebar translation menu (same control, dispatches `setDisplayWindows`).
- **Server sync:** none; the server schema has no `translation` field (U3 finding).

## 8. Opening, finding and closing windows

- **Buttons** appear in the sidebar translation menu and in Settings → Translation, when translation is active (eligible device, `mode !== 'off'`), in both `single` and `separate` modes (so a presenter can try a popup without changing the setting): one for the original, one for the translated feed. Each shows the language chip (for example `ES`) next to the text "Open in a new window", and its accessible name is built from the language name plus that text. After opening, the button reads "Show window" and focuses it.
- **`CaptionWindowService.open(feed)`** must be called from the click handler (a user gesture). It calls `window.open('/caption-window?opener=…&feed=…', 'zc-caption-' + feed, 'popup=yes,width=960,height=540')`. The fixed window name means a second click re-uses the open popup (and the service calls `focus()`), so there is at most one popup per feed.
- **Popup blockers.** A `null` result from `window.open` means Chrome blocked it. The service exposes a `blocked` signal; the UI shows "The window was blocked. Allow pop-ups for this site, then try again." No automatic retry, and no attempt to open a tab instead.
- **Registered popups** are the ones that sent `hello` and haven't sent `closed`. The service exposes `openFeeds` (a signal) so the buttons can show their state. Popups don't answer heartbeats, so a popup that crashes without sending `closed` stays listed until the next `hello` or `closed`. That only affects the button label ("Show window"), and clicking it opens a fresh popup, because `window.open` on a dead name creates a new one.
- **Lifecycle (FR-W4).**
  - Closing the main window: `bye`, then the popups close after the grace period (§4).
  - Closing a popup: sends `closed`. Recognition and translation are unaffected, because the popup holds neither.
  - The main window stopping recognition does not close popups; they show the final state and "Start speaking…" like the main window.
  - "Close language windows" (sidebar and settings) posts `close`.
- **Separate mode** with no popup open: the main window shows the original only, and the buttons are the call to action. Switching back to `single` doesn't close popups.

## 9. Full screen on any display (FR-W3a)

- The popup's control bar has a **Full screen** button (and an **Exit full screen** state), using `requestFullscreen()` on the caption container in response to the click. Pressing Esc exits (browser default). The button uses its own small helper, not `FullScreenService` (that service registers a single main-window element and listens on it).
- **Choosing another display** uses the Window Management API, which is permission-gated:
  - If `'getScreenDetails' in window` **and** `window.screen.isExtended`, the control bar shows a **Full screen on another display** button.
  - Clicking it calls `getScreenDetails()`. The first call prompts for the `window-management` permission. If granted, the popup lists the screens by their `label` (the current one marked) and calls `requestFullscreen({ screen })` on the chosen one. The permission is remembered by Chrome, so later clicks don't prompt.
  - **Without the permission (denied or dismissed), without the API, or with a single display:** the button is hidden or shows a message and the popup falls back to plain full screen on **the display the window is currently on**. The user can drag the popup onto the projector first. Nothing else is lost.
  - A change of screens (`screenschange`) refreshes the list; a chosen screen that disappears falls back to the current one.
- A pure helper `screen-selection.ts` (choose by id, label for display, fallback) holds the logic so it can be tested without a browser.

## 10. i18n strings

New `en.json` keys first, one sentence per key; other locales via `cd scripts && python3 translate.py` (never by hand). The script fills only **missing** keys and writes no trailing newline, matching the committed locale files; `en.json` keeps its trailing newline.

**No `{{param}}` strings:** `translate.py` has no placeholder protection and `en.json` has none today, so a key such as "Open {{language}} in a new window" would likely be mangled. The language name is rendered next to the text instead (§8).

| Key | English |
|---|---|
| `SETTINGS.TRANSLATION.displayWindows` | Display windows |
| `SETTINGS.TRANSLATION.displayWindowsSingle` | One window |
| `SETTINGS.TRANSLATION.displayWindowsSingleDesc` | Show the captions in this window, as split or translated only. |
| `SETTINGS.TRANSLATION.displayWindowsSeparate` | Separate windows per language |
| `SETTINGS.TRANSLATION.displayWindowsSeparateDesc` | Keep the original here and open each language in its own window. |
| `SETTINGS.TRANSLATION.openInNewWindow` | Open in a new window |
| `SETTINGS.TRANSLATION.showWindow` | Show window |
| `SETTINGS.TRANSLATION.closeLanguageWindows` | Close language windows |
| `SETTINGS.TRANSLATION.windowBlocked` | The window was blocked. |
| `SETTINGS.TRANSLATION.windowBlockedHelp` | Allow pop-ups for this site, then try again. |
| `CAPTION_WINDOW.fullScreen` | Full screen |
| `CAPTION_WINDOW.exitFullScreen` | Exit full screen |
| `CAPTION_WINDOW.fullScreenOtherDisplay` | Full screen on another display |
| `CAPTION_WINDOW.displayDenied` | Display access was not allowed, so full screen uses this window's display. |
| `CAPTION_WINDOW.waiting` | Waiting for the main window… |
| `CAPTION_WINDOW.reconnecting` | The main window is not responding. |
| `CAPTION_WINDOW.closingSoon` | This window will close soon. |

No existing English value changes, so no keys need removing from the other locales first.

## 11. Documents to update on approval

`requirements.md` (FR-W3b dropped with the spike result and a note on the log caveat; FR-W5 wording to "single or separate"), `stories.md` (US-W3 dropped), `units-of-work.md` (U5 section), `aidlc-state.md`, and the §14 deviations in this file after implementation.

## 12. Decisions for approval

Each has a recommendation. Reply "approve" to take them all, or list changes.

1. **Spike outcome.** Take the human's observation (the second PiP closes the first, both orders) as the result and drop FR-W3b / US-W3, noting the log caveat in the audit. *Recommend yes.* The alternative is a re-test with a `pipWindow.closed` poll before deciding; it costs a minute and changes nothing else in this design.
2. **Transport and format.** One `BroadcastChannel`, versioned messages with an opener ID, full-snapshot `state` plus a separate `live` message, reusing `WireSegment` and the U3 line builders. *Recommend this.* The alternative is incremental events, which are smaller but break when a popup opens late or the opener reloads.
3. **Popup shell.** A lazy `/caption-window` route; `AppComponent` hides the chrome and skips the login, engine load and transcript database in that route; the popup never injects the recognition or translation services. *Recommend this.* The alternative is a separate Angular bootstrap or HTML entry point, which is cleaner but means a second build target and service-worker scope.
4. **Lifecycle.** `bye` on `pagehide`, a 2 s heartbeat, a 10 s grace period before a popup closes itself, `ready`/`hello` re-registration after an opener reload, and a `close` message instead of `WindowProxy` references. *Recommend this.* The alternative is closing popups on any `pagehide`, which also closes them on every main-window reload, mid-session.
5. **Settings reach the popup** by saved settings at boot plus a channel `settings` snapshot applied with a reducer-only `applyRemoteSettings`; the popup never writes `localStorage`. *Recommend this.* The alternatives are re-dispatching the normal setting actions in the popup (two windows would write the same key) or listening to the `storage` event (re-inits the popup's store from a file that is still changing).
6. **Settings model.** `displayWindows: 'single' | 'separate'`, default `'single'`, optional with a selector default. In `separate` the main window shows the original and PiP is unchanged. *Recommend this.* The alternative is letting the user pick which feed the main window keeps, which doubles the options for a case nobody asked for.
7. **Opening windows.** Buttons in the sidebar translation menu and in Settings, available in both modes while translation is active; one popup per feed with a fixed window name so a second click focuses it; a blocked popup shows a message, with no retry. *Recommend this.* The alternative is offering the buttons only in `separate` mode, which makes the setting a prerequisite for trying the feature.
8. **Full screen.** Plain full screen by default; "Full screen on another display" appears only with the Window Management API on a multi-display machine and asks for the permission on first use; denied or missing falls back to the window's current display. *Recommend this.* The alternative is calling `getScreenDetails()` when the popup opens, which prompts before the user asked for anything.
9. **Original popup needs translation active.** The buttons live in the translation menu, so with translation off there is no popup (an original-only second display is a follow-up). *Recommend leaving it out of U5.* The alternative is adding an "Open captions in a new window" button to the general caption sidebar, which widens scope beyond translation.
10. **Strings without parameters.** No `{{language}}` interpolation; the language chip sits next to "Open in a new window". *Recommend this.* The alternative is `{{language}}` strings plus a check that `translate.py` keeps the token intact, which I would have to verify for 10 locales.

## 13. Test plan

Component specs for `recognition-render` and the sidebar still fail on the existing setup gaps, so logic lives in pure modules and plain classes.

| Spec | Cases |
|---|---|
| `caption-window-protocol.spec.ts` (new) | Build and parse each message type. Unknown `v` or `type` is ignored. A message with another `opener` is ignored. `seq` ordering drops an older `state`/`live`/`settings`. |
| `caption-window-state.spec.ts` (new) | A `state` snapshot gives the same lines as `buildOriginalLines`/`buildTranslatedLines` (pending placeholders, per-line `lang`/`dir`). A `live` message updates only the live lines. Pass-through segments aren't pending. |
| `caption-window.service.spec.ts` (new; in-memory fake `BroadcastChannel`, fake `window.open`, fake timers) | `open()` calls `window.open` once with the expected URL and name, and focuses instead on a second call. A `null` result sets `blocked`. A `hello` registers the popup and is answered with `state`, `live` and `settings`. `closed` unregisters it and recognition signals are untouched. State publishing is a no-op with no popup registered. Heartbeats run only while popups exist. `bye` is sent on `pagehide`. `close` is posted by `closeAll()`. |
| `caption-window-bridge.spec.ts` (new) | Applies `state`/`live`/`settings`. Waiting → ready. `bye` or a missed heartbeat starts the grace timer; `ready`, `state` or `heartbeat` cancels it; expiry calls `window.close()`. A `hello` is sent on load and again after `ready`. |
| `screen-selection.spec.ts` (new) | Choose by id; fall back to the current screen when the chosen one is gone, the API is missing, permission is denied or there is one display; labels. |
| `settings.reducer.spec.ts` (extended) | `setDisplayWindows` sets the value; the default is `single`. `applyRemoteSettings` updates the display fields only and touches no recognition/transcription state. `saveTranslationSettings` accepts the field. |
| `settings.selector.spec.ts` (extended) | `selectDisplayWindows` defaults when absent. The display-settings snapshot selector changes only for its own fields (a pane swap does not change it). |
| `settings.effects` (extended) | `setDisplayWindows` triggers the whole-object `translation` write. **`applyRemoteSettings` triggers no storage write.** |
| `caption-view.spec.ts` (extended) | `separate` + not PiP → `original` for every mode; `separate` + PiP → `pipContent`; `single` unchanged. |
| `app.component` route check (small pure helper, spec) | `/caption-window` is detected; other paths aren't; the helper decides the skipped boot actions. |

**Pass criteria**
- `npx jest -c packages/client/jest.config.ts --ci --forceExit`, output to a log: no new failing suites, compared by name against a `HEAD` worktree run (44 of 113 failing after U4; the run may hang with idle workers — kill and rerun).
- `npx tsc -p packages/client/tsconfig.app.json --noEmit` and an `ngc` template check are clean.
- New tests exist and pass for the protocol, the service, the bridge, display-settings persistence (including "no write from `applyRemoteSettings`") and screen selection.
- **Not verifiable without a browser** (the same limit as U3/U4): a real popup, a real projector, the Window Management prompt, and the visual layout. I will say so in the audit entry and propose a short manual checklist (open both popups, change typography, reload the main window, close the main window, deny pop-ups, full screen on a second display).

## 14. Constraints observed

- **Angular 16:** `toObservable()` is called only in constructors or field initializers (the service and the bridge); no `ngOnInit` use.
- **Azure recognizer configuration** is not touched; no language detection is added.
- **Translation** stays on Chrome's on-device `TranslatorApiAdapter` through the existing `CaptionTranslationService`. The popup runs no translator, and nothing cloud-based is introduced.
- **Spoken language** vs **interface language** stay separate. The popup follows both through `applyRemoteSettings`.
- **i18n** follows the `en.json`-first, `translate.py` rules above.
- **Docs** were looked up through docs-mcp (`document-pip`, `window-management`).
- **Commits** will be `feat(translation): …` plus a separate `docs(aidlc): …`; nothing is pushed.

## 15. Out of scope

- A Document PiP window per popup (§1) and any "always on top" behaviour for popups.
- Remembering popup size or position; opening a popup directly on a chosen display (only full screen picks a display).
- An original-only popup while translation is off (§12.9).
- OBS feed (U6) and conversation mode (R2).
- Viewers (`broadcast-render`) opening windows; this is for the broadcaster's own display.
