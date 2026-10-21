# v0.5.0 release candidate: hand-off for the fix sessions

Written 2026-10-18 at the end of the staging QA session. **The source of truth for what to fix is `rc-findings.md` in this folder** (21 numbered findings, with decisions, evidence and open points). This file says how to work and in what order. Read both, plus `functional-design.md` (§2, §3.2c, §6, §7), `infra/staging/README.md` and the workflows `deploy-staging.yml` and `teardown-staging.yml`.

## State

- Repo `/Users/oblivious/Documents/zip-captions`, branch **`release/v0.5.0`** (cut from `develop` at `31d77ff`). Tags `v0.5.0-rc.1` (`04e0e65`) and `v0.5.0-rc.2` (`bdc98e4`) are pushed. The tip, `ff458e4` (the findings file) plus this file, is **local only**.
- **Staging is up and running rc.2** (the Azure environment `ZipCaptions-Staging`, client `https://next.zipcaptions.app`, API `https://next-api.zipcaptions.app`, domains bound, Google sign-in works). Staging is ephemeral: deleting `release/v0.5.0` on the remote tears it down. The user runs every `az` command; never run `az`.
- The user does the QA by hand on staging. They have a Chrome with the translation models downloaded, and can start a broadcast and give you a join code (`/stream/<code>`).
- Not in scope, do not touch: `main`, production, `git flow release finish`, the Bicep deploy, the domain-binding commands, the delete-triggered teardown, DNS.

## Rules (from the user; they override defaults)

- **Push, open PRs or merge only when the user says so.** Every push to `release/**` runs the full staging deploy (tests, image build and push to Docker Hub, Azure deploy, about 15 minutes), so batch fixes and ask before each push. A push of the branch first, then the new tag.
- Each pushed candidate gets a new annotated tag `v0.5.0-rc.3`, `-rc.4`, and so on, on the branch tip. Fixes are one `fix:` or `feat:` commit each on `release/v0.5.0`, plus a `docs(aidlc)` record (update the status in `rc-findings.md`, and add to `functional-design.md` §7 if a decision changes the design). Commits end with the Co-Authored-By line from the session's system reminder.
- **Edit files with the Edit and Write tools only.** Never python, `sed -i` or heredocs through Bash to change files. Scratch files go in the session scratchpad. Create no files the user did not ask for.
- **Secrets:** never ask the user to paste a value, never print or write one.
- Follow the AI-DLC unit workflow (memory: aidlc-unit-workflow): for anything with a design question, a design gate with numbered decisions first, then implement; verify by suite name; no push.
- **New UI text is translated with the translation script** (memory: i18n-translate-script: glossary and context notes), never by hand.
- Delegate mechanical, well-specified code steps to Qwen on the Spark with the `qwen-delegation` skill if the user asks; you stay the orchestrator and own git. Keep judgment-heavy and security-sensitive edits yourself.
- Be honest about what is untested. Findings marked "read in the source (not run)" are hypotheses until reproduced.

## Order of work

Batch so that each pushed candidate tests a coherent set, and ask before each push.

1. **Enablers (do first).** #17: add `"sourceMap": true` to the `staging` build configuration in `packages/client/project.json` (keep the optimised build; never add it to `production`). With it, console errors on staging have readable stack traces, which #8, #16 and #11 need.
2. **Small UI fixes.** #1 (download button disabled while translation is off, settings screen), #2 with #10 (download prompt in the centre of the translation panel, and an immediate spinner plus disabled state on click, in all three places: settings, caption screen, viewer; also the overlap with the viewer sidebar), #12 (sidebar pop-ups close when the drawer closes, all four menus), #13 (remove the three swap buttons from the templates; **keep** the swap action, reducer, `canSwap()` and strings), #14 (PiP controls hide after about 1 s, not 3.5 s; decide whether the main caption screen shares it), #15 (PiP button with a "pop out" icon in the header next to the stop-recognition control; decisions listed in the finding), #18 (no microphone button in the header for a viewer), #6 (the direct link uses the current origin, not `https://zipcaptions.app`), #5 (a call to action after creating a broadcast that leads to the start-stream tab), #11 (the socket is undefined when `refreshUserRooms` runs on load).
3. **Translation robustness.** #8 and #16 (one cause family: unbounded retries of failed segment translations, a failed Chrome `Translator` instance that is never discarded, and a failure the user cannot see; the reload fixes #16), #3 (a language change must translate what is on screen first; needs a measurement).
4. **Viewer.** #19 (a stream-provided translation is offered, and is what a new viewer starts on; seen on Safari), #20 (a visible control that shows another language is available), #7 (Firefox: `webkitSpeechRecognition is not defined` on a viewer, with no message), #9 (a 504 on the `stream` route: investigate first, it may be staging-only).
5. **#21, critical, last and with its own design gate.** Tag each segment of a bilingual Azure locale with the language that was spoken, because Azure does not report it (tested: no field names the language, in either output format, and the docs agree). Decisions are in the finding: Chrome's `LanguageDetector` on the final text, scored only against the locale's two languages, only for a bilingual Azure dialect with translation on, no fallback library, a short or uncertain segment takes the previous segment's language, a UI note in both the settings and live caption screens, both translation directions available on the device. Open: the first segment of a session, whether the detector needs a model download and a gesture, the pane model (each pane a language, not "spoken" and "translated"), and the pane layout that follows. Do not change the Azure recogniser configuration or add language identification.

Finding #4 is not for this release: the backlog item is `aidlc-docs/construction/backlog-languages-tab.md` on `docs/backlog-npm-warnings`, which also holds `backlog-npm-warnings.md`. Do not merge that branch into the release branch; it goes to `develop`.

## Verifying

- Client tests: `npx jest -c packages/client/jest.config.ts`, compared by suite name (the specs have known failures; see `construction/backlog-test-debt.md`). Run the suites of what you touched and say which.
- **Browser checks with the Puppeteer MCP** (loaded with ToolSearch). Against staging, after a candidate is deployed: a viewer join works from Puppeteer's own browser (a guest, no sign-in), so #6, #18, #19, #20 and the viewer parts of #2 and #10 are checkable there; give the user the steps for anything that needs their signed-in Chrome with the translation models (the host side, PiP, the sidebar on the caption screen). Puppeteer's browser cannot do speech or on-device translation. Use test ids (`zc-*`).
- A diagnostic script for #21 exists in the earlier session's scratchpad (`azure-lang-check/check.js`); it needs the Speech key in the user's own shell and is not part of the repo.
- Staging logs: the user tails `az containerapp logs show --name zip-captions-server-staging --resource-group ZipCaptions-Staging --type console --follow`. The Log Analytics history is deleted with the environment.

## Before the candidate is accepted

The production `enforce` rollout, the Cosmos DB question and the on-device translation gate (`SOCKET_AUTH_MODE=enforce` in production) are separate decisions, not part of the fix sessions. When the candidate is accepted: `git flow release finish`, delete the remote release branch (that runs the teardown), and the user deletes the three DNS records.
