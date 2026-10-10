# AI-DLC Audit Log — On-Device Translation

## 2026-10-10 — Inception kickoff

**Human request (summary):** Use AI-DLC to spec on-device translation now that Chrome ships it. Ensure clean git state first. Cover three stories:
1. Simple speak-and-translate for conversation with another hearing person, where the input language alternates between turns.
2. Present a single translated caption feed on a screen.
3. Display original and translated text simultaneously, split horizontally or vertically.

**AI actions:**
- Git: `develop` was clean but 2 commits behind `origin/develop`; fast-forwarded to `7e0f8a4` (PR #146). Left 3 pre-existing stashes untouched. Created `feature/on-device-translation`.
- Researched the platform API (Chrome Translator / Language Detector APIs; see requirements §2).
- Reverse-engineered the caption pipeline (requirements §3).
- Drafted requirements, verification questions, personas, stories, and proposed units of work.

**Awaiting:** Human answers to verification questions and approval before Construction.

## 2026-10-10 — Answers received; Azure bilingual correction

**Human:** answered Q1–Q10 (see requirements §7). Added: Azure `fr-CA` must keep automatically switching between French and English. Corrected the AI: this is documented Azure behavior. Asked for the Azure STT docs to be indexed in docs-mcp, then for the index to be fixed.

**AI actions:**
- Wrongly claimed `fr-CA` switching was unimplemented and proposed continuous LID. **Retracted.** Source found: STT release notes ("Bilingual Speech Modeling": `fr-CA` French+English, `es-US` Spanish+English; also `ar-*` + English and `en-IN` English+Hindi). These work natively from the locale alone.
- Spec revised: Azure recognizer config is unchanged for bilingual locales. Per-segment language for translation comes from the browser's `LanguageDetector`, restricted to the pair. Bilingual locales give automatic turns in conversation mode.
- docs-mcp library `azure-speech-to-text`: the HTML crawl reached only 131 of ~197 TOC pages (Learn's nav is built by JavaScript), and GitHub-repo mode indexed nothing. Fixed by adding each missing TOC page through the docs-mcp CLI with `--no-clean`.

## 2026-10-10 — Adopt crippit `translations` branch; broadcast & PiP refinements

**Human:** merge crippit/zip-captions `translations` into this branch and build on it. Keep our broadcast design: if the broadcaster translates, viewers get both languages. Keep viewer-side translation as a fallback for other languages on supported devices. Investigate Document PiP with separate windows per language as a configuration option.

**AI actions:**
- Merged `crippit-gh/translations` (`8fbbd92`) as `507fe2a` with no conflicts. Gap analysis is in `inception/application-design/units-of-work.md`.
- Found a regression in the merged code: the `saveTranscriptionSettingsFailure` reducer handler was removed (scheduled in U0).
- Document PiP research: WICG spec §6.5 allows at most one PiP window per top-level browsing context, and `requestWindow()` closes the opener's existing one. Separate per-language windows are therefore specified as popups synced over `BroadcastChannel`. A popup gets its own PiP window only if a spike confirms Chrome allows PiP windows in two top-level windows at once.
- Added FR-B1…B5, FR-W1…W5, US-D3, Epic W; rescoped units to U0–U7.
