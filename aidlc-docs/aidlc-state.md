# AI-DLC State — On-Device Translation

| Field | Value |
|---|---|
| Intent | Add live, on-device caption translation using the browser's built-in Translator API |
| Branch | `feature/on-device-translation` (from `develop` @ `7e0f8a4`) |
| Project type | Brownfield (Angular 16 / NgRx / Nx client in `packages/client`) |
| Current phase | **Inception → Construction** |
| Current stage | Release 1 Construction — U0, U1, U2, U3, U4, U5, U6 done; U8 (settings persistence, follow-up bug fix) done (#150, merged); U9 (test debt) done (client suites #151, server suites #152, CI job #153; all merged) (U5 rescoped to the PiP feed switch after the spike; per-language popups are in the backlog); U10 (authenticated socket identity, release-blocking) merged (#154), still in `report` mode by default; all Release 1 units complete; Release 2 (conversation mode) is next; U11 (authenticated PeerJS identity, follow-on, not release-blocking) merged (#156), also in `report` mode by default |

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

### Release blockers (human, 2026-10-14)
The on-device translation feature is not released until **U10** (authenticated socket identity) is done **and production runs with `SOCKET_AUTH_MODE=enforce`**. **U11** (PeerJS server has no authentication; the peer id is the user id) blocks the release only if it is a regression compared to `main`; the human decided on 2026-10-14 that otherwise it is a follow-on issue. Checked 2026-10-14: `peer-server.service.ts` is identical on `main` and `develop`, and `main` already creates the peer with the user id (`new Peer(this.myId, …)`), so U11 is **not** a regression: it is a follow-on issue and does not block the release.

U10 is merged (#154) but the default mode is still `report`, in which the original attack remains open by design. Moving production to `enforce` needs its own plan (signal, threshold, stragglers on old clients, rollback): `construction/backlog-socket-auth-enforce.md`.

U11 is merged (#156) with `PEER_AUTH_MODE` defaulting to `report`. It is not a release blocker. Move it to `enforce` only after `SOCKET_AUTH_MODE=enforce` is live and the `legacy peer registration` log lines have stopped (the peer token travels in the socket reply, so the deploys are shared); see `construction/u11-peer-identity/functional-design.md` §5.1.
