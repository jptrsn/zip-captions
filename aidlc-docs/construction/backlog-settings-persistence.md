# Backlog: persist transcription and translation settings on the server

**Status:** decided 2026-10-13, not started. Do it as **one follow-up after PR #149 merges** (decision by the human), on a gitflow branch off `develop`, for example `feature/sync-transcription-translation-settings`. Then the test-debt branches (`backlog-test-debt.md`), since the `user-saved-settings` spec is one of the ten that overlap.
**Treated as a bug**, not a feature request: the client sends these settings and the server silently discards them.

## What happens today (verified)

"Save current" (Settings > Sync) posts the whole settings state, including `transcription` and, on this branch, `translation`. The server stores only fields that exist in the Mongoose `UiSettings` schema, and that schema has neither. Verified with a throwaway test against the real schema (deleted afterwards): both the create path (`new Model(payload)`) and the update path (`doc[key] = value`, as `UiSettingsService.upsert` does) drop `translation` and `transcription` and keep `lang` and `uiLanguage`. The controller returns a pruned copy (`toJSON`), which the client keeps as the saved settings.

Consequences:
- `transcription` and `translation` live only in the browser's local storage. They do not follow the user to another device.
- Logging in or applying saved settings merges the server copy with the local one, so the local values survive; this is why the toggle appears to work on one machine.
- The Sync tab compares key counts between the saved and the current settings (`settingsMatch`). The saved copy always lacks those two keys, so by the code "in sync" can never be true and "Save current" never disables. Read from the code, not observed in a browser (needs a login). The `transcription` half exists on `develop` already.

## Prior art in the repo

- **PR #143** (merged, `dairytech`, "keep transcript toggle on after login when UI sync is enabled"): added `{ enabled, titlePattern }` to the sync snapshot, merged server settings with the local `transcription` on apply, and compared with `JSON.stringify`. Client files only. Its description says: "I have not verified the server persisting the new field yet." The server half was never done. It is the reason this is a small change now.
- Closed-unmerged PRs and the forks (`crippit`, `dairytech`) have nothing on this.

## Plan

1. **Server schema** (`packages/server/.../ui-settings.model.ts`): add `transcription` (`enabled`, `titlePattern`) and `translation` (`enabled`, `mode`, `targetLanguage`, `splitOrientation`, `paneOrder`, `pipContent`, `obsFeed`, `dialectByLanguage` as a mixed map) as typed sub-documents without `_id`, so values are type-checked and unknown nested fields are still dropped. Existing documents need no migration (fields are optional); old clients ignore the new fields.
2. **Tests:** the schema keeps those fields and still drops unknown ones; `upsert` round-trips them for a new and for an existing document; the controller's pruned response contains them. Use the throwaway test from this investigation as the starting point.
3. **Client:** nothing to change for sending or applying (done in #143 and, for `translation`, already merged into the apply path). Fix the Sync tab's `settingsMatch` so an account saved before this change (no such keys) does not stay out of sync forever; decide the rule in the design step (for example compare only keys present on both sides, or treat missing as default).
4. **Decision made here:** sync the **whole** `translation` object, including the device-specific `pipContent` and `obsFeed`. They are harmless on a device that cannot use them (translation is gated on browser support, PiP and OBS are desktop-only), and one rule is simpler than a list. Revisit if it surprises someone.
5. **Rollout:** deploy the server first. A new client against an old server behaves exactly as today.

## Risks and checks

- The real login flow cannot be run from localhost (the API's CORS allows only `zipcaptions.app` and the Azure redirect is registered to production, as PR #143's author found). Plan the verification as server-side tests plus a direct authenticated POST/GET against a local server and database; say plainly what was not verified end to end.
- Privacy: language preferences and a transcript title pattern the user typed. No audio or transcript text.
- Related open issue **#147** (replace the M2M100 locale pipeline with a local LLM) overlaps with the `scripts/translate.py` work in PR #149; link them.

## Also in this follow-up: remove the `PRIVACY.4.6` paragraph

Carried over from issue #147, which PR #149 supersedes but does not fully implement. The decision recorded there: Zip Captions has no payment services (it is funded through Patreon), so the privacy-policy paragraph about "our payment services provider, PSP name" does not apply, and its "PSP name" and "URL" placeholders go with it.

- Delete the key `PRIVACY.4.6` from `en.json` and the ten other locale files. `translate.py` has no `--prune`, so this is a plain deletion in each file; keep each file's formatting (two-space indent, trailing newline in `en.json` only).
- Delete the matching entry `{ text: 'PRIVACY.4.6' }` in `packages/client/src/app/components/privacy/privacy.component.ts` (line 69 at the time of writing). The page lists its keys explicitly, so removing only the JSON key would show a raw key on the privacy page.
- Check afterwards that the privacy page renders without a gap, in English and in one other language.
- It is a legal-policy text change; the human should confirm before it ships.

