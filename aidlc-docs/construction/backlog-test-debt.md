# Backlog: client test debt (44 failing suites)

**Status:** proposed, not started. Added 2026-10-13 after PR #149.
**Why now:** the failing suites were found at the U0 baseline (`develop`: 46 of 96) and have stayed about the same size since. No unit added a failing suite, but every unit had to work around them (pure helpers, template guard specs), and the UI of the translation feature has no component-level test as a result. Carrying them forward means the next regression in those components is invisible.

## Baseline (2026-10-13, branch tip after PR #149)

44 of 120 client suites fail. All 44 also fail on `develop`; none is caused by the translation work. Only the **first** error of each suite was read, so fixing it may reveal a second.

| # | Cause (first error) | Suites | Usual fix |
|---|---|---|---|
| 1 | `No provider for Store` | 17 | `TestingModuleProviders` from `src/testing/test-scaffold.ts` (`provideMockStore`). 46 specs already use it. |
| 2 | `No provider for HttpClient` | 6 | `HttpClientTestingModule` / `provideHttpClientTesting()` |
| 3 | `webkitSpeechRecognition is not defined` | 4 | Stub the global as `web-recognition.service.spec.ts` does, or provide a stub `RecognitionService` |
| 4 | `No provider for ActivatedRoute` | 2 | `RouterTestingModule` (already in `TestingModuleImports`) |
| 5 | `No provider for TranslateService` | 2 | `TranslateTestingModule` (already in `TestingModuleImports`) |
| 6 | NG0304 unknown element | 5 | `src/test-setup.ts` sets `errorOnUnknownElements: true`, so declare the child components or use stubs |
| 7 | NG0303 can't bind `formGroup` | 3 | import `ReactiveFormsModule` (already in `TestingModuleImports`) |
| 8 | `Cannot read properties of undefined (reading 'get')` | 2 | the host setup does not give the component its form group or control; needs reading |
| 9 | `getUserMedia` of undefined | 1 | stub `navigator.mediaDevices` |
| 10 | TypeScript errors inside the spec | 2 | the spec imports something that no longer exists; update to the current API |

Suites per group: (1) obs-connection-status, recognition-engine-select, supporter-render, unsaved-changes guard, login, peer-home, start-broadcast, broadcast-settings, obs-studio-settings, recognition-engine, transcription-settings, ui-settings, user-saved-settings, provider, transcripts-list, user-home, user-profile · (2) google-oauth-login, microsoft-login, auth.service, transcription.service, room-card, user.service · (3) app.component, recognition-render, broadcast-room, stream-captions · (4) join-broadcast, view-transcript · (5) save-to-server-dialog, unsaved-changes-dialog · (6) home, welcome-splash, recognition-control-sidebar, settings, peer-landing · (7) dialect-selector, font-family-selector, render-history · (8) transcript-enabled, editable-string · (9) end-broadcast · (10) user.reducer, jwt.interceptor.

The exact list is reproducible: run `npx jest -c packages/client/jest.config.ts` in a `git worktree` of the base commit with `node_modules` symlinked, and compare **by suite name** after stripping the path prefix (the two runs print different prefixes).

## Suggested approach

1. Groups 1, 2, 4, 5 and 7 (about 28 suites) are mechanical: use the scaffold that already exists.
2. Group 6 next (declare or stub the children), then groups 3 and 9 (stubs).
3. Groups 8 and 10 need reading.
4. Many of these are the generated "should create" spec that never got set up. Decide per suite whether to also assert one real behaviour, rather than only making `should create` pass.
5. No deleting or silently skipping specs. A skip needs a reason written next to it.
6. Done when the suite has no failing suites, and `npx jest` runs in CI if it does not already (not checked).

Constraints that still apply: `toObservable()` only in constructors or field initializers (Angular 16); compare by suite name; the full run sometimes hangs on its last suite, so kill it and report which suite has no result.

## Running it in a parallel session

**Parked until PR #149 is approved** (2026-10-13). Then follow gitflow (the repo uses `feature/*` branches off `develop`):

- Start a new branch off `develop`, for example `git switch -c feature/fix-failing-client-tests develop`. Not from `feature/on-device-translation`. If another session is working in this checkout, use a separate worktree instead (`git worktree add ../zip-captions-tests -b feature/fix-failing-client-tests develop`) so the two do not share a git index or jest cache.
- Recompute the baseline on `develop`; it differs from this branch.
- **CodeRabbit skips a PR over 100 files** (see `.coderabbit.yaml`), so split the work by group into several PRs.
- **Do the 10 specs that sit next to files PR #149 changes after #149 has merged:** app.component, recognition-control-sidebar, recognition-render, broadcast-room, stream-captions, obs-studio-settings, recognition-engine, settings, ui-settings, user-saved-settings. The other 34 do not overlap. Fixing the 10 after the merge also lets their specs cover the new translation UI.
- Nothing in PR #149 depends on this work.
