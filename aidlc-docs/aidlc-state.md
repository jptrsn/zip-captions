# AI-DLC State — On-Device Translation

| Field | Value |
|---|---|
| Intent | Add live, on-device caption translation using the browser's built-in Translator API |
| Branch | `feature/on-device-translation` (from `develop` @ `7e0f8a4`) |
| Project type | Brownfield (Angular 16 / NgRx / Nx client in `packages/client`) |
| Current phase | **Inception → Construction** |
| Current stage | Release 1 Construction — U0 (baseline hardening) in progress; NG0203 + reducer fixes done |

## Phase / stage tracker

### Inception
- [x] Workspace detection & reverse-engineering of the caption pipeline (see `inception/requirements/requirements.md` §3)
- [x] Requirements analysis
- [x] Requirement verification questions answered
- [x] Personas & user stories (revised for Azure bilingual locales)
- [x] Units of work (U1–U7)
- [x] **Gate: human approval** ("proceed", 2026-10-10)

### Construction (per unit, after approval)
- [ ] Functional / domain design
- [ ] NFR design (latency, privacy, a11y)
- [ ] Code generation + unit tests
- [ ] Build & test

### Operations
- [ ] Release notes, i18n strings, feature flag rollout
