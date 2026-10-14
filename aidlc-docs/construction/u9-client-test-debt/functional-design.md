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

## 11. Server suites (branch `feature/fix-failing-server-tests`, off `develop` after #150)

D7 was taken up: the 8 failing server suites (Nest boilerplate with no providers, one that could not load) are replaced with specs that test behaviour. **Server: 12 of 12 suites, 148 tests pass** (was 4 of 12).

- **Approach:** the services are tested against their real Mongoose schemas with `save`, `findOne` and the other model calls stubbed. `SessionService` uses `src/testing/in-memory-model.ts`, a small array-backed stand-in (find / findOne / updateMany / deleteMany, document save / deleteOne, a subset of Mongo query matching). The testing helpers and `*.fixture.ts` files are excluded from the app build (`tsconfig.app.json`); the server still builds.
- **Mutation check:** four production changes (skip the webhook signature check, skip the live-broadcast guard on room deletion, add the whole cap instead of the difference, ignore the user check on `refreshRooms`) were all caught; files restored.
- **Production fixes (separate commits):**
  - `AppService.upsertSupporter` used `delete` on a Mongoose document, which does nothing, so a deleted member kept their `tiers`; now `set(field, undefined)`.
  - `SupporterService` imported `Injectable` from `@angular/core`; now from `@nestjs/common`, which also lets Jest load it. A test builds the service through Nest's DI.
- **Defects found, recorded as `it.failing` tests, not fixed (D5):**
  - `SessionService.getUserIdForNewClientConnection` calls `setUserId(userId)`, passing the user id where the client id belongs. The gateway only calls it for brand-new socket ids, which are never known, so it is not reached today.
  - `generateRandomRoomId(true)` makes ids whose prefix `_validateRoomForUser` then rejects for a static room (generator and validator read the parity opposite ways). `updateUserRooms` is the only caller of the validator and is reached only from a client action nothing dispatches.
- **Other observations:** `endBroadcastSession` throws a `TypeError` (not an HTTP error) when the room has no live broadcast; `handleEndBroadcast` would then fail; `setUserId` can create a connection with `userId` undefined, which the schema rejects (stubbed `save` hides it in the spec).
- **Still open for U9:** a CI job that runs both suites (D6).

## 13. Server defects fixed (2026-10-14, on the server PR)

| Defect (§11) | Outcome |
|---|---|
| `getUserIdForNewClientConnection` passed the user id as the client id | Fixed: `setUserId(clientId, userId)`. The `it.failing` test is now a normal test. Not reached in practice (the gateway only calls it for new socket ids). |
| Static room ids rejected by the validator | The generator and validator read the prefix parity opposite ways. I changed the **validator** to follow the generator, because ids already in the database were made by the generator (static rooms have an odd prefix, dynamic rooms an even one); changing the generator would have needed a migration. The helper is now `_prefixIndicatesStatic`, with a comment, and a test pins the convention. `updateUserRooms` is the only user of the validator and is not reached by the app today. |
| `endBroadcastSession` threw a `TypeError` with no live broadcast | Returns `null`; the gateway logs and does nothing. |

**New finding (fixed after the human approved it, see below):** `endBroadcastSession` looks the broadcast up by room only, so any client with a known user can end someone else's live broadcast by naming its room (the gateway notices a non-owner only after the broadcast is ended). Recorded as an `it.failing` test. The fix is a one-line change (also match `hostUserId`), but it changes who can end a broadcast; in particular a second tab of the same account is treated as an anonymous user (the `isAnonymized` path in `handleSetUserId`) and would lose the ability to end the broadcast. Not checked against real clients.

Server: 12 of 12 suites, 152 tests pass; `tsc` and a development build are clean.

**Ownership fix (approved 2026-10-14):** `endBroadcastSession` now looks the broadcast up with `hostUserId: userId` as well as the room, and returns `null` otherwise, so only the host's user can end it. Any client of that user (another device) still can. A second tab that the gateway has anonymised (`isAnonymized` in `handleSetUserId`) is a different user and can no longer end the broadcast; the host's own tab, which holds the end button, is unaffected. Tests: a non-host client cannot end it, another client of the host's user can, and with several live rooms only the right one ends. Server: 12 of 12 suites, 154 tests. Not checked against real clients.

**After the Qwen review of #152 (2026-10-14):**
- The review's main finding, that `endTime: undefined` is dropped by Mongoose so "no live broadcast" would not behave as the tests show, was **tested and does not hold**: with Mongoose 7.8.6 against a real MongoDB, `find({endTime: undefined})` matches only the live broadcast, the same as `endTime: null`. No change.
- The unreachable non-owner branch in `handleEndBroadcast`, its user lookup and its test were removed (the service only returns the caller's own broadcast). The dynamic-room parity assertion is `toBe(0)`.
- **Limitation of the ownership check:** it is only as strong as the `userId` that the `setId` message assigns to a socket. `handleSetUserId` takes the id from the message without authenticating it. If the user already has a connected client, a second claimant is anonymised; otherwise the claim is accepted. User ids are visible to peers (room messages carry the host's id), so someone who knows the host's id could claim it while the host has no connected client (for example during a reconnect) and then end the broadcast. This is pre-existing weakness in how sockets are identified; the fix is to authenticate the socket (verify the JWT) when it identifies itself. Not changed here.

**The seven inline comments on #152 (readable once re-posted):**
- **`endTime: undefined` (major):** refuted again with the wire format. Using the driver's own serialisation (`ignoreUndefined: false`, the default for the driver), the filter sent for `{ roomId, hostUserId, endTime: undefined }` contains `"endTime": null`, and with the ended broadcast inserted first only the live one is returned. The reviewer's "dropped" result comes from `BSON.serialize` or `JSON.stringify`, which ignore `undefined` by default. The app sets no `ignoreUndefined` option. Caveat: this was checked against a local MongoDB; production appears to use Azure Cosmos DB (port 10255, `replicaSet=globaldb`), which I did not test. `undefined` and `null` both reach the server as `null`, so changing the code to `null` would change nothing there; I left it.
- **`setId` / ownership (major, judgment):** accepted and documented. One detail added: when a claim is accepted, `setUserId` also moves the user's live broadcasts to the claiming client (`hostClientId`), so the claimant takes over the host's notifications as well as the ability to end the broadcast. Fix is to authenticate the claim; not in this PR.
- **Unreachable branch and its test:** removed (earlier).
- **Rejection path at the gateway:** test added.
- **Webhook spec pins two weaknesses:** the signature is compared with `===` (not constant time) and a missing `PATREON_SUPPORTER_WEBHOOK_SECRET` silently disables the pipeline. Both are production changes; **approved and done (2026-10-14)**: the signature is now required to be exactly 32 hex characters and compared with `crypto.timingSafeEqual` (a bare `Buffer.from(x, 'hex')` stops at the first non-hex character, so a correct signature followed by junk would otherwise pass), and the controller logs a warning when it starts without the secret. Checked end to end on the built server: a correct and an upper-case signature are accepted, a wrong one and a correct one with junk appended get 403 (logged), and the warning appears only when the secret is unset. Server: 12 of 12 suites, 165 tests.
- **Helper JSDoc and location:** documented what the helper does not do; moved to `packages/server/test/` so the app build cannot see it (checked: not in the bundle).
