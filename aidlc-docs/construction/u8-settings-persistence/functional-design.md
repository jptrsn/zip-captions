# U8 — Settings Persistence: Functional Design

**Status:** v1, approved 2026-10-13 with the recommendations (human also confirmed the `PRIVACY.4.6` removal: "we do not take payments"). Implemented; deviations in §10. Branch `feature/sync-transcription-translation-settings` off `develop` @ `93fc76b` (PR #149 merged). Local only.
**Covers:** the bug in `construction/backlog-settings-persistence.md`, plus the `PRIVACY.4.6` removal carried over from issue #147.
**Size:** small. One schema change, one pure comparison helper, one text deletion in 13 files. The part that needs care is the comparison (D3): the obvious fix is not enough (§1, last row).

## 1. Current state (read from code)

| Item | Finding |
|---|---|
| Server schema | `UiSettings` ([ui-settings.model.ts](../../../packages/server/src/app/modules/user/models/ui-settings.model.ts)) has `ownerId, theme, lang, uiLanguage, dialect, wakelock, renderHistory, textSize, lineHeight, textFlow, fontFamily`. No `transcription`, no `translation`. Mongoose strict mode drops them silently (verified earlier with a throwaway test, see the backlog). |
| Server write | `UiSettingsService.upsert` ([ui-settings.service.ts:10](../../../packages/server/src/app/modules/user/services/ui-settings.service.ts#L10)): existing document → `doc[key] = value` for each key **in the request**; new → `new Model(payload)`. A key that is absent from the request is left as stored. |
| Server read | `GET/POST profile/:id/settings` return `_pruneSettingsFields` (`toJSON`, minus `ownerId`, `_id`) ([user.controller.ts:308](../../../packages/server/src/app/modules/user/user.controller.ts#L308)). The controller caches that pruned copy (`SETTINGS_CACHE_KEY`), so the cache follows the schema; nothing separate to change. |
| Server tests | `ui-settings.model.spec.ts` checks two paths. `ui-settings.service.spec.ts` only checks "defined" (and creates the module with no model provider, so it probably fails today; I will check, not assume). `user.controller.spec.ts` has no settings case. |
| Client send | `saveCurrent()` posts `selectSyncSettings`: the whole settings state with `transcription` minus `loading` (PR #143). `translation` rides along because it is part of `SettingsState`. Nothing to change. |
| Client apply | `applySettings$` merges server `transcription` and `translation` over local ones (`{...existing, ...saved}`), so the server copy wins key by key and missing keys keep local values ([settings.effects.ts:31](../../../packages/client/src/app/effects/settings.effects.ts#L31)). Old accounts (no such keys) fall back to the local copy. Nothing to change. |
| Sync tab "in sync" | `settingsMatch` ([user-saved-settings.component.ts:55](../../../packages/client/src/app/modules/settings/components/user-saved-settings/user-saved-settings.component.ts#L55)): equal **key counts** and, per saved key, `JSON.stringify` equality. |
| Why the obvious fix is not enough | After the schema change, the saved copy's `translation` comes back from Mongoose with keys in **schema order**; the current state's keys are in **reducer order** (`defaultSettingsState`: `enabled, mode, targetLanguage, splitOrientation, paneOrder, pipContent`, with `obsFeed` and `dialectByLanguage` appended when set). `JSON.stringify` is order-sensitive, so a perfectly synced account could still read "out of sync" depending on the key order I choose. Mongoose also drops `undefined` and, with the default `minimize`, an empty `dialectByLanguage: {}`. The rule must be order-insensitive and treat `undefined`/empty as absent. (Read from code; not observed, since it needs a login.) |
| `PRIVACY.4.6` | One key in each of the 11 locale files (`"4.6"` inside `PRIVACY`, directly after `4.5`; it is the last entry of the 4.x group, so deleting it also needs a comma fix on `4.5`'s line only if it is the last key in the object, which I will check per file) and one entry `{ text: 'PRIVACY.4.6' }` at [privacy.component.ts:69](../../../packages/client/src/app/components/privacy/privacy.component.ts#L69), the last item of its `sections` array (the trailing comma on line 68 must go). |

## 2. Schema

Add two typed sub-schemas (no `_id`), built with `@Schema({ _id: false })` and `SchemaFactory.createForClass`, and use them as `type: TranscriptionSchema` / `type: TranslationSchema` on `UiSettings`.

- `transcription`: `enabled: Boolean`, `titlePattern: String`. (`loading` is stripped on the client and not stored.)
- `translation`: `enabled: Boolean`, `mode: String`, `targetLanguage: String`, `splitOrientation: String`, `paneOrder: String`, `pipContent: String`, `obsFeed: String`, `dialectByLanguage: Mixed` (`{ [lang]: dialect }`, written by `swapLanguagePair`).
- No defaults on the server (an absent field stays absent; the client supplies defaults, as for the existing fields).
- Unknown nested fields are dropped (strict sub-schemas). Wrong types are cast or rejected by Mongoose (for example `enabled: 'x'` fails casting).
- Existing documents are untouched: both fields are optional, and `fromDb[key] = value` on an old document just adds them. Assigning the whole object replaces the sub-document, so a nested key the client no longer sends (for example a cleared `obsFeed`) disappears on the next save. That is the right behaviour for a snapshot.

## 3. `settingsMatch` rule

A pure exported helper `settingsMatch(saved, current, defaults)` in a new `settings-match.ts` beside `sync-settings-rows.ts`, with its own spec; the component's `computed` just calls it (component specs for this screen fail on setup gaps, so the logic lives in the helper).

Rule (D3):
1. Iterate the **current** state's keys, not the saved ones' (so a key an older or newer server doesn't know about cannot hold the tab out of sync, and the key-count check goes away).
2. For each key, the saved value is `saved[key]`, or, **when the key is missing on the saved side, the default** (`defaultSettingsState[key]`). Object values (`transcription`, `translation`) are compared after overlaying the saved sub-object on the default sub-object, the same overlay `_applySettingsToDefault` and `applySettings$` use.
3. Compare with an order-insensitive deep equal that ignores `undefined` values and treats a missing key and `undefined` as equal.

Effect: an account saved before this change reads "in sync" while the user's `transcription`/`translation` are at their defaults, and reads "out of sync" (so *Save current* is enabled) as soon as the user has changed them, which is when saving is useful. An account saved after this change reads "in sync" after *Save current*, whatever the key order.

Rejected: "compare only keys present on both sides" — an old account would read "in sync" while the user has translation enabled, and *Save current* would stay disabled, so the user could never save the new settings (only by changing something else first).

## 4. Tests

Component specs for the Sync tab fail on existing setup gaps, so logic is in pure helpers. Each new test is confirmed to **fail against the old code** before I trust it (for the server: run it with the schema change stashed; for the helper: against the old `JSON.stringify` rule re-expressed in the spec).

| Spec | Cases |
|---|---|
| `ui-settings.model.spec.ts` (extended) | Paths exist with the right types; a new document built from a full client payload keeps `transcription` and `translation` (every field, including `dialectByLanguage`) and still drops `loading` and an unknown nested field and an unknown top-level field; `translation` and `transcription` subdocuments have no `_id`; wrong type is rejected. |
| `ui-settings.service.spec.ts` | `upsert` for a **new** owner and for an **existing** document (mock model with real schema via an in-memory document, no database): stored and returned copy contain both groups; an upsert **without** `translation` keeps the stored one (old client); an upsert with a changed nested value replaces it (including removing `dialectByLanguage`). First checks whether the file runs at all today. |
| `user.controller.spec.ts` | `saveSettings` and `getSettings` return a pruned copy that contains `transcription` and `translation` and no `ownerId`/`_id` (stub service returning a real hydrated document). Only if the existing spec setup allows it; otherwise the pruned-copy check goes on a real `Model` instance in the service spec. |
| `settings-match.spec.ts` (new) | Identical state; same values different key order; old account (no `transcription`/`translation`) with default state → match; old account with non-default translation → no match; new account after save (as Mongoose would return it) → match; `undefined` and absent equal; extra unknown saved key ignored; a changed nested value (`translation.targetLanguage`, `transcription.titlePattern`) → no match; saved `undefined` → no match (existing behaviour). |
| Privacy | A spec that reads the `PRIVACY` section list from `privacy.component.ts` and every key it names exists in `en.json`, and that no locale has a `PRIVACY` key absent from `en.json` (guard against a raw key on the page). Only if the keys can be read without the Angular test bed; otherwise a node-level check in the spec. |
| Full runs | Client baseline recomputed in a `git worktree` of `93fc76b` with `node_modules` symlinked; compared by suite name, path prefix stripped; a hung last suite is killed and reported. `npx tsc` and `npx ngc` on `tsconfig.app.json`. Server: `npx jest -c packages/server/jest.config.ts`. |

## 5. Verification and what it cannot show

- **Direct authenticated request against a local server and database** (no real login, since CORS allows only zipcaptions.app and the Azure redirect is production-only): start the server on a non-default port (3000 and the debugger port 9229 clash with `nx serve signal`) with a local MongoDB, mint a JWT the way the guard expects (to be read from the guard; if it needs a secret I don't have locally I'll say so rather than bypass it), POST a full client payload, GET it back, and check the stored document in Mongo. I have not confirmed a local MongoDB is available here; if it isn't I will say so and fall back to `mongodb-memory-server` only if it is already a dependency.
- Not verifiable: the real login flow, a second device picking the settings up, the Sync tab in a browser against a real account.

## 6. Constraints observed

- File tools for exploring; Angular 16 `toObservable` rule (no new `toObservable` here); Co-Authored-By trailer; no push or PR until asked; small diff for CodeRabbit (about 25 files, 10 of them non-English locales that the config excludes).
- i18n: deletions only, formatting kept per file. No new strings, so `translate.py` is not needed.
- Commits: `fix(server): …` for the schema, `fix(client): …` for the comparison, `docs(privacy): …` or `fix(privacy): …` for the paragraph (a separate commit so it can be reverted alone), then `docs(aidlc): …`. `aidlc-state.md`, `audit.md` and `units-of-work.md` updated at the end.

## 7. Second-order effects I checked or will check

- **Old clients:** ignore the new fields on read; on write they omit them, and `upsert` leaves stored values alone, so an old client saving does not wipe `translation`. Covered by a test.
- **New client, old server (before deploy):** behaves as today; the tab shows out of sync until the server is deployed. Hence "server first".
- **Device-specific values travel:** `pipContent`, `obsFeed` (and `targetLanguage`) from one device overwrite the local ones on another device when sync is on and settings are applied, because `applySettings$` lets the saved value win. That is the decision already made (D2 below); stated here so it isn't a surprise. Also: `translation.enabled: true` on a device that can't translate stays inert (gated on browser support), as before.
- **Applying saved settings while a same-tick change is pending:** `applySettings$` is not changed, so nothing new.
- **Cached `GET`:** the controller caches the pruned response; it is refreshed on each save, so a new field appears on the next GET without a cache bust. A GET cached **before** the deploy has no cache across restarts (in-process cache; to be confirmed in the module setup).
- **Privacy:** stored data is language preferences and a transcript title pattern the user typed, nothing from audio or transcripts. The policy text may deserve a sentence about it; I have not drafted one and I am not adding one without your say (D6).

## 8. Decisions

Already made, not reopened: whole `translation` object synced (including `pipContent`, `obsFeed`); typed sub-documents without `_id`; server first, no migration, old clients ignore the new fields; one follow-up branch.

1. **Field types: plain `String`, no `enum` validators.** *Recommend:* `mode`, `splitOrientation`, `paneOrder`, `pipContent`, `obsFeed` are `String` with no enum. An enum would make the whole save fail (HTTP 500 from a validation error) the day a newer client adds a value, and the old clients' selectors already fall back to defaults for unknown values. *Alternative:* enums for stricter data, at the cost of that failure mode.
2. **`dialectByLanguage` as `Mixed`.** *Recommend:* `Mixed`, as in the backlog, because it is a `{ lang: dialect }` map. The cost is that its contents aren't type-checked server-side. *Alternative:* a Mongoose `Map` of String (checked values, but `toJSON` needs `flattenMaps` and the returned shape differs, one more thing to get wrong).
3. **`settingsMatch` rule.** *Recommend:* §3: iterate the current keys, overlay saved on defaults when a key (or nested key) is missing, order-insensitive deep equal ignoring `undefined`. *Alternative A:* compare only keys present on both sides (simpler, but an old account can't save translation until something else changes). *Alternative B:* keep `JSON.stringify` and fix the key order in the schema (fragile: depends on reducer order forever).
4. **Where the helper lives and what it imports.** *Recommend:* new `settings-match.ts` next to `sync-settings-rows.ts`, importing `defaultSettingsState` from the reducer file. *Alternative:* pass the defaults in as an argument (already in the signature, so the spec can supply its own; the component passes the real ones).
5. **Tests.** *Recommend:* §4, no real database in unit tests; the end-to-end check is the manual local-server request in §5. *Alternative:* add `mongodb-memory-server` to the server tests (heavier dependency; I would not add one without your approval).
6. **`PRIVACY.4.6` removal — LEGAL TEXT, needs your explicit confirmation.** The paragraph, in English:
   > "All our website financial transactions are handled through our payment services provider, PSP name. You can review the provider's privacy policy at URL. We will share information with our payment services provider only to the extent necessary for the purposes of processing payments you make via our website, refunding such payments and dealing with complaints and queries relating to such payments and refunds."

   *Recommend:* delete it from `en.json`, the 10 other locales and `privacy.component.ts`, as decided in issue #147: Zip Captions has no payment services (Patreon handles funding), and the paragraph still contains the template placeholders "PSP name" and "URL". It is a policy-text change that ships to users, so **please confirm** (or tell me to leave it out of this branch). I'm not adding replacement wording about the synced settings unless you ask. *Alternative:* keep it until someone with authority over the policy approves; the branch then ships without it.
7. **Commit split.** *Recommend:* schema + tests; client helper + tests; the `PRIVACY.4.6` removal alone; then `docs(aidlc)`. *Alternative:* one `fix` commit (less to review, but the legal text can't be reverted alone).
8. **Privacy page check.** *Recommend:* the spec above plus a browser look at `/privacy` in English and one other language (puppeteer, as in earlier units), reported as done only if I actually load it.

## 9. Not verified (will be reported again at the end)

Real login and a second device; the Sync tab in a browser against a real account; whether the deployed server's cache or Mongo version behaves like the local one; the privacy page in a browser until I load it.

## 10. Deviations and findings from implementing

- **Server baseline:** 10 of 12 server suites failed before this work (Nest boilerplate specs with no providers), including `ui-settings.service.spec.ts` and `user.controller.spec.ts`. Both are rewritten (no database, no Nest test bed: a real Mongoose schema with `save` and `findOne` stubbed; the controller built directly with stubs). Now 8 of 12 fail, all untouched boilerplate.
- **Fixture:** `ui-settings.fixture.ts` (a client-shaped payload) is shared by the three server specs.
- **D3 helper:** `settingsMatch(saved, current, defaults)` takes loose `object` types because a real saved copy can lack keys the type says exist. Empty objects are treated like absent keys (Mongoose's `minimize` drops an empty `dialectByLanguage`).
- **Privacy guard spec** reads `privacy.component.ts` as text; the locale files mix nesting with flat dotted keys (`PRIVACY` > `"4.3"`), so the lookup tries every split, as ngx-translate does.
- **Privacy page:** `/privacy` is routed to `PrivacyComponent` **and** a resolver that does `window.location.replace('https://www.zipsolutions.org/privacy.html')`. So users are probably sent to the external page, and the in-app component is probably never seen. I did not confirm this in a browser (the dev server answered 404 for `/privacy` and the external URL answered 404 from here). The external policy page is not in this repo, so **it may still carry the payment paragraph**.
