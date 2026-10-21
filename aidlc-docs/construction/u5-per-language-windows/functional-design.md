# U5 — Picture-in-Picture Feed Control: Functional Design

**Status:** v2, all six decisions approved 2026-10-12 as recommended (§8). Implemented; see §10. (v1 proposed per-language popup windows; rescoped to PiP-only on 2026-10-12. The popup design is kept as `backlog-popup-windows-design.md`.)
**Covers:** FR-W1 (completed: the content can be switched from inside the PiP window) · US-W1 · simple dual-language display via the existing split option.
**Moved to the backlog:** per-language popup windows, full screen on a chosen display, "Display windows" setting (FR-W2, W3a, W4, W5 · US-W2), and the dual-language display design.
**Dropped:** a PiP window per popup (FR-W3b / US-W3), because Chrome closes the first PiP when a second opens (§1).

## 1. Spike result

Run by the human on 2026-10-12 in Chrome 154.0.8037.98 (macOS 15.7.5, arm64); full record in `audit.md`.

- Opening a Document PiP window from a second top-level window closed the PiP window held by the first, in both orders. `requestWindow()` was never rejected.
- **Implication:** only one PiP window can exist at a time, so the PiP has to be able to show whichever feed the user wants. That is what this unit builds. Two floating feeds are not possible.
- Caveat on the pasted log (late `pagehide` in one order, no overlap in the other) is in the audit. Nothing in this design depends on it.

## 2. Current state (read from code)

| Item | Finding |
|---|---|
| PiP content | `pipContent` (`original` \| `translated` \| `split`, default `translated`) decides the PiP view through `resolveCaptionView` (U3). Switching updates the open PiP window immediately, because `captionView` is a computed signal. |
| Where it can be changed | Settings → Translation, and the sidebar translation menu. **The sidebar isn't in the PiP window** (the registered caption container is moved, the drawer stays behind). From a floating PiP the user has to return to the main window to switch feed. |
| Controls inside the PiP window | The caption container holds the translated-pane controls (language select, swap, download), the divider cluster (orientation, pane swap; **split view only**), and the pane labels. In the **original-only** PiP view there are no controls at all; in the **translated** view there are only the language controls. None switches the feed. |
| Idle fade | `controlsVisible` fades overlays after 3.5 s without pointer activity (`onUserActivity`/`onControlsFocus`); the PiP window gets those events because the handlers sit on elements that move with the container. |
| Split in PiP | Already works: same orientation and pane order as the main window, aligned panes with placeholders, per-line `lang`/`dir`. The PiP opens at 640×320 and is user-resizable; there is no automatic orientation change. |
| Persistence | `setPipContent` is already in the `saveTranslationSettings$` action list, so a change made in the PiP window persists like one made in settings. |
| i18n | `SETTINGS.TRANSLATION.pipContent`, `pipContentOriginal`, `pipContentTranslated`, `pipContentSplit` already exist in all locales. |

## 3. What gets built

A single, minimal **feed switch inside the PiP window**.

- A three-button segmented control centred at the top of the caption container: **spoken language**, **translated language**, **both**. The buttons show the language codes already computed for the pane labels (for example `EN`, `ES`) and, for "both", `EN+ES`. Language codes aren't translated, so the visible text needs no new strings.
- Each button dispatches the existing `setPipContent({ content })`. The active one has `aria-pressed="true"`. The group is `role="group"` with `aria-label` from `SETTINGS.TRANSLATION.pipContent`, and each button's `aria-label`/`title` is the existing `pipContentOriginal` / `pipContentTranslated` / `pipContentSplit` string.
- **Visible only when it can do something:** the PiP window is open **and** translation is on (display mode is not `off`, which on an ineligible device is always the case). Otherwise the PiP just shows the captions, with no extra UI. This is exposed as a pure `showPipFeedSwitch(mode, pipActive)` in `caption-view.ts`.
- **Minimal UI:** extra-small buttons, and the same fade as the other overlays (`controlsVisible`, `onControlsFocus`/`onUserActivity`), so it is gone while captions are being read. It sits at the top centre because the other corners are taken (pane label and language controls at the top left, model download at the top right), and the divider cluster is at the vertical centre.
- **Dual-language in the PiP** is the existing `split` choice: the third button selects it, and the divider cluster (orientation, pane swap) appears as it does today. Stacked stays the default, which suits the wide 640×320 window. A purpose-designed dual-language display stays in the backlog.
- The control is markup in `recognition-render`'s caption container (so it moves into the PiP window with it), made of plain text buttons with no new icon imports.

## 4. Behaviour details

- Changing the feed in the PiP window changes the **setting**, so the sidebar and Settings show the new choice and it is the starting choice next time the PiP opens. (A PiP-only override that is not saved was considered; it would make the sidebar disagree with what the window shows.)
- With translation on, pass-through segments, placeholders and per-line `lang`/`dir` behave as in U3/U4. No change to recognition, translation or broadcast.
- Closing the PiP returns the container to the main window; the control hides because `isPipActive()` is false. In the main window the sidebar remains the place to change `pipContent`.
- Chrome copies the main stylesheets into the PiP window once when it opens, so the new control uses classes that already exist in the stylesheet (the same Tailwind/daisyUI classes as the divider cluster). No style changes.

## 5. Settings, persistence, i18n, server

- **No new setting, action, reducer case or effect.** `pipContent` and `setPipContent` exist (U3).
- **No new i18n strings**, so no `translate.py` run and no locale files change.
- **No server or wire-format change.**

## 6. Test plan

Component specs for `recognition-render` and the sidebar still fail on existing setup gaps, so the logic is a pure helper and the existing reducer coverage applies.

| Spec | Cases |
|---|---|
| `caption-view.spec.ts` (extended) | `showPipFeedSwitch`: true only when PiP is active and mode is `split` or `translated-only`; false when PiP is closed; false when mode is `off`. |
| `settings.reducer.spec.ts` (existing U3 cases) | `setPipContent` for each value still passes. Re-run, no change. |
| `settings.effects` (existing U3 cases) | `setPipContent` still triggers the whole-object `translation` write. Re-run, no change. |

**Pass criteria**
- `npx jest -c packages/client/jest.config.ts --ci --forceExit`, output to a log: no new failing suites, compared by name against a `HEAD` worktree run (44 of 113 failing after U4; the run may hang with idle workers, so kill and rerun).
- `npx tsc -p packages/client/tsconfig.app.json --noEmit` and an `ngc` template check are clean.
- **Not verifiable without a browser** (same limit as U3/U4): the control inside a real PiP window. I will say so in the audit and give a short manual checklist: open the PiP with translation on; confirm the control appears and fades with idle; switch spoken, translated and both; confirm the sidebar and Settings follow; confirm no control with translation off; resize the window to check that it doesn't cover captions.

## 7. Constraints observed

- **Angular 16:** no new `toObservable()`; the template only reads existing signals and dispatches an existing action.
- **Azure recognizer configuration** is untouched; **no language detection**.
- **Translation** stays on Chrome's on-device `TranslatorApiAdapter`; nothing cloud-based.
- **Spoken language** vs **interface language** stay separate; the control shows the spoken and target language codes only.
- **Commits:** `feat(translation): …` plus a separate `docs(aidlc): …`; nothing is pushed.
- **Docs** were looked up through docs-mcp (`document-pip`).

## 8. Decisions for approval

Each has a recommendation. Reply "approve" to take them all, or list changes.

1. **In-window feed switch.** A three-way control inside the PiP window (spoken, translated, both) that dispatches the existing `setPipContent`. *Recommend this.* The alternative is leaving the control in the sidebar and Settings only, which keeps the PiP unusable on its own.
2. **Persist the change.** The switch updates the saved `pipContent`, so the sidebar and Settings agree with the window. *Recommend this.* The alternative is a temporary override that resets when the PiP closes, which can disagree with the sidebar.
3. **Show it only while translation is on.** Hidden when the PiP is closed or translation is off. *Recommend this.* There is nothing to switch otherwise.
4. **Dual-language = the existing `split` option.** Keep it as the third choice, stacked by default, with the existing divider cluster; no automatic orientation change for the small window. *Recommend this.* A purpose-built dual-language design stays in the backlog.
5. **Placement and look.** Top centre, extra-small segmented buttons with language codes, same idle fade as the other overlays, no new icons or strings. *Recommend this.* The alternative is icons with tooltips, which needs new icon imports and is no clearer than `EN` / `ES` / `EN+ES`.
6. **Backlog record.** Keep the popup design as `backlog-popup-windows-design.md` (marked deferred), and on approval update `requirements.md` (FR-W2, W3a, W4, W5 deferred; FR-W3b dropped; FR-W1 note on the in-window switch), `stories.md` (US-W1 amended; US-W2 deferred; US-W3 dropped), `units-of-work.md`, `aidlc-state.md` and the audit. *Recommend this.*

## 10. Implementation notes

- As designed: `showPipFeedSwitch` in `caption-view.ts` (with a spec), and in `recognition-render` a `pipContent` signal, a `showPipSwitch` signal, a `setPipContent()` method and the markup inside the caption container. Nothing else changed.
- The buttons use daisyUI's `join` / `join-item` classes (daisyUI is ^4.0.0, which has them). No other template in the app uses `join`, so the stylesheet has no copy of those rules unless Tailwind picks them up from this template; the template check passes, but **check in the browser that the three buttons render joined in the PiP window**.
- Checked: `caption-view.spec.ts` (8 cases, all pass), client typecheck and `ngc` template check (clean), full suite compared by name (no new failures).
- Not verified: the control in a real PiP window (see the checklist in §6).

## 9. Out of scope (backlog)

- Per-language popup windows synced over `BroadcastChannel`, full screen on any display, the "Display windows" setting, and closing popups with the main window. The design is in `backlog-popup-windows-design.md`.
- A purpose-designed dual-language display.
- A PiP window per popup (dropped; the spike shows Chrome allows one PiP at a time).
- OBS feed (U6) and conversation mode (R2).
