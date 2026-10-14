# U9 — Client Test Debt: Functional Design

**Status:** v1, **awaiting human approval** (nothing coded yet). Builds on `construction/backlog-test-debt.md`.
**Goal:** the client suite has no failing suites, so a regression in those components shows up as a red test.
**Not in scope:** the 8 failing server suites (Nest boilerplate, same pattern; proposed as a follow-up, D7).

## 1. Current state (re-read from the full run on this branch, 2026-10-13)

44 of 122 suites fail (the 44 are identical by name on `develop` @ `93fc76b`; the two new suites pass). First error of each suite only, so fixing one may reveal a second. Grouping differs slightly from the backlog's, which was written before #150 and counted `TranslateService` and a few others separately.

| Group | First error | Suites | Fix |
|---|---|---|---|
| A | `No provider for Store` | 15: start-broadcast, transcription-settings, obs-connection-status, obs-studio-settings, user-saved-settings, recognition-engine, supporter-render, broadcast-settings, transcripts-list, user-profile, peer-home, ui-settings, user-home, provider, login | `TestingModuleProviders` (mock store) from `src/testing/test-scaffold.ts` |
| B | `No provider for HttpClient`-chain: `AuthService`, `UserService`, `TranscriptionService` | 6: google-oauth-login, microsoft-login, auth.service, room-card, user.service, transcription.service | `HttpClientTestingModule` and mock store |
| C | `webkitSpeechRecognition is not defined` | 4: broadcast-room, recognition-render, stream-captions, app.component | stub the global (as `web-recognition.service.spec.ts` does) or stub the recognition service |
| D | NG0304 unknown element (`errorOnUnknownElements: true`) | 5: peer-landing, home, welcome-splash, settings, recognition-control-sidebar | declare the child components, or `NO_ERRORS_SCHEMA`-style stubs |
| E | NG0303 can't bind `formGroup` | 3: font-family-selector, dialect-selector, render-history | import `ReactiveFormsModule` (in `TestingModuleImports`) |
| F | `Cannot read properties of undefined` | 3: end-broadcast, transcript-enabled, editable-string | needs reading: the host gives no form control / input |
| G | `No provider for ActivatedRoute` | 2: join-broadcast, view-transcript | `RouterTestingModule` |
| H | missing provider in a standalone component | 3: unsaved-changes-dialog, save-to-server-dialog, recognition-engine-select | provide what the dialog injects (`MatDialogRef`-style tokens, store, …) |
| I | TypeScript error inside the spec | 3: unsaved-changes.guard, jwt.interceptor, user.reducer | update the spec to the current API |

Two things that matter for scope:
- **No CI job runs the tests.** The only workflow now is `deploy.yml` (on `main`); it builds and deploys and has no test step. The two `develop` workflows I removed also had none. So "done" does not stop a regression from merging unless a test job is added (D6). I have read the workflow files, not the repository's branch-protection settings.
- Many of these are Angular's generated "should create" specs that were never set up. Making `should create` pass proves little (D3).

## 2. Approach

- **Order:** mechanical first (A, B, E, G, H), then D and C (declare or stub children, stub the speech global), then F and I (read each one).
- **Recompute the baseline on `develop`** in a worktree at the base commit (node_modules symlinked), compare by suite name with the path prefix stripped, kill a hung last suite and report it.
- **No deleting and no silent skips.** A skip needs a written reason next to it.
- **Logic goes in pure helpers** where a component spec would need heavy setup; test those instead (existing rule).
- **Confirm each fixed spec fails for the right reason first**, i.e. that it was failing on setup and not hiding a real bug; if fixing the setup reveals a real product bug, stop and report it instead of editing the assertion.
- **Branching:** gitflow, `feature/*` off `develop`. `user-saved-settings` overlaps with #150 (same component), so it goes in the last PR, after #150 merges.
- **PR size:** CodeRabbit skips PRs over 100 files and allows one review per hour. Specs are one file each, so groups fit, but I will batch pushes.

## 3. PR split

| PR | Groups | Suites | Notes |
|---|---|---|---|
| 1 | A (minus user-saved-settings), E, G | ~19 | mechanical |
| 2 | B, H, I | ~12 | needs HTTP mocks and API updates |
| 3 | D, C, F | ~11 | stubs and reading; the translation UI suites (settings, recognition-control-sidebar, recognition-render, peer-landing) also get one real assertion each (D3) |
| 4 | user-saved-settings | 1 | after #150 merges; also covers the Sync tab's `settingsMatch` binding |

## 4. Tests and verification

- Full client run per PR, compared by suite name to the `develop` baseline: failing suites only go down, none new.
- `npx tsc -p packages/client/tsconfig.app.json --noEmit` and `npx ngc ...` after each PR (specs are excluded from the app tsconfig, so also confirm the jest run itself compiles).
- Not verified by this unit: app behaviour in a browser (these are specs, not product changes), unless a real bug turns up.

## 5. Constraints observed

Angular 16: `toObservable()` only in constructors or field initializers; file tools for exploring; Co-Authored-By trailer; `docs(aidlc)` commit at the end of each PR; update state, audit and units-of-work.

## 6. Decisions

1. **Order and PR split.** *Recommend:* the 4 PRs in §3, mechanical groups first. *Alternative:* one PR per group (more review rounds, one review per hour limit makes it slower).
2. **Scope of "done".** *Recommend:* zero failing client suites. *Alternative:* fix groups A, B, E, G only (about 30 suites) and leave the rest documented.
3. **Depth of each fixed spec.** *Recommend:* make the setup correct and add **one real behaviour assertion** where the component has user-visible logic, and a plain "creates" check only where the component has none. The translation UI suites get a real assertion. *Alternative:* only make `should create` pass (fast, but the debt would come back as a green test that covers nothing).
4. **Specs that cannot be fixed cheaply** (for example ones that need a real microphone). *Recommend:* stub the browser API and test the logic around it; if impossible, `it.skip` with a reason comment and a line in the audit, never delete. *Alternative:* delete the spec (loses intent).
5. **Product bugs found on the way.** *Recommend:* stop, report, and fix in a separate commit, not by changing the assertion. *Alternative:* fix in place.
6. **Run the tests in CI.** *Recommend:* add a small `test.yml` workflow (`npm ci`, `npx jest` for client and server) on pull requests to `develop`, as a final separate PR **after** the suite is green, so it does not start red. *Alternative:* leave CI unchanged (the suite can regress unnoticed again), or add it now with the known failures excluded (red-by-default is how the debt was normalised).
7. **Server suites.** *Recommend:* a follow-up unit in the same style (8 boilerplate suites, same cause: no providers). *Alternative:* include now (larger PR 2) or leave them.
8. **Starting point.** *Recommend:* start PR 1 now, off `develop`, since it does not overlap with #150, and start PR 4 only after #150 merges. *Alternative:* wait for #150 to merge before starting anything (simpler, but idle).

## 7. Not verified (to be reported again at the end)

Branch-protection settings; whether any suite hangs only in CI; that fixed specs would have caught the regression they are meant to guard (checked per suite where a real assertion is added, by mutating the code once, not for the others).
