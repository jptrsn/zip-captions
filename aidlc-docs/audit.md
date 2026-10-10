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
