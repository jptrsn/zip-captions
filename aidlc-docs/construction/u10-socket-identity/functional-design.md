# U10 — Authenticated Socket Identity: Functional Design

**Status:** v1, **approved 2026-10-14; implemented** (see §7 for deviations). Decisions D1–D10 were answered by the human on 2026-10-14: all recommendations accepted. D8 is "out of scope, tracked as U11". The human decided U11 blocks the release only if it is a regression compared to `main`; it is not (the peer server and `new Peer(myId)` are identical on `main`), so it is a follow-on issue. Builds on `construction/backlog-socket-identity.md` (local-only; its §1 current-state analysis stands and is summarised in §1 here).
**Branch:** `feature/authenticate-socket-identity-impl`, off `develop` @ `7d469f9` (#151 and #152 merged; #153 CI still open, develop gets merged in later). Local only until the human asks for a PR.
**Goal:** a socket's user id is something the client *proves*, not something it *asserts*. **Release gate:** the translation feature is not released until production runs with `SOCKET_AUTH_MODE=enforce`.
**Not in scope:** PeerJS server authentication (U11), token refresh or revocation, rate limiting, hiding user ids from peers.

## 1. The bug (read from code, 2026-10-14)

- `SessionGateway.handleSetUserId` stores `payload.id` from the `setId` message as the socket's user without verifying it. The only guard is `isAnonymized` (the id already has a *connected* client, so the second claimant gets a fresh random id).
- User ids are public: `user joined room`, `user left room` and `connect clients` carry them.
- A successful claim (possible whenever the victim has no connected client, e.g. during a reconnect) lets the claimant: (1) take over `hostClientId` of the victim's live broadcasts (`SessionService.setUserId` re-points them) and so receive the join notifications; (2) end the broadcast (`endBroadcastSession` looks up by the claimed user); (3) receive the victim's room list (`set rooms`).
- Anonymous hosts exist (no login needed to host) and their random ids are claimable the same way.
- JWTs (`{ sub }`, 1 day, `JWT_SECRET`) are issued in `UserController._sendTokenResponse` and verified over HTTP only (`JwtStrategy`, `JwtInterceptor` on the client). `JwtModule` is registered in the user and Azure-STT modules, not `AppModule`.
- Client: `PeerService.connectSocket` emits `setId { id: myId }` on every `connect`; `myId` comes from the store's `userId` (account id when logged in, else a cached anonymous id, cached 60 minutes) and is adopted from `set user id success`. `myId` is also the PeerJS id.

## 2. Design

### 2.1 Handshake (D2)
- The client passes `auth` as a **function** to socket.io (`SocketIoConfig.options.auth`) so each reconnect sends current values: `{ token, anonymousToken }` (login JWT from the store/storage; the stored anonymous token). Never in the URL.
- The server verifies in a middleware registered in the gateway's `afterInit` (`server.use`), via a new `SocketIdentityService`, and stores `socket.data.identity = { userId, kind, anonymousToken?, authFailed? }`. The middleware never rejects a connection (D3).

### 2.2 Resolution (D1, D3)
| Presented | Identity |
|---|---|
| Valid account JWT (`JWT_SECRET`, not expired, has `sub`) | `account`, `userId = sub` |
| No valid account JWT, valid anonymous token | `anonymous`, `userId = sub` |
| Neither | `anonymous`, a new random id plus a freshly signed anonymous token (`issued`) |
| A token was presented but invalid or expired | as the line above, plus `authFailed`; the server sends `auth failed` once the socket is set up so the client can prompt a login. Viewing keeps working. |

An account JWT presented as `anonymousToken`, and an anonymous token presented as `token`, are both invalid (different keys, §2.3).

### 2.3 Anonymous tokens (D4)
- HS256, key = `HMAC-SHA256(JWT_SECRET, 'zip-captions/anonymous-socket/v1')`, claims `{ sub, aud: 'anonymous-socket' }`, lifetime 7 days, verified with the audience required. They cannot pass the HTTP `JwtStrategy` (different key), so an anonymous id can never become an HTTP principal.
- Issued only for ids the **server** generated; never for an id the client names. Sent in `set user id success` (`anonymousToken`), stored by the client for 7 days, presented on later connects.
- Not issued to an `isAnonymized` second tab (§2.5): that tab's identity is per-socket and on reconnect it presents its account token again.

### 2.4 `setId` (D5) and the mode switch (D7)
- `payload.id` is never an identity claim. The id registered for the socket is `socket.data.identity.userId`. A different payload id is ignored and logged. The reply carries the real id, which the client already adopts.
- `SOCKET_AUTH_MODE` (`report` | `enforce`; default `report`; any other value is treated as `enforce`, fail closed):
  - **report:** when **no valid credential** was presented and `setId` names an id, behave as today (accept it, `isAnonymized` rule as today) and log a `legacy setId claim` line with a running counter. Valid credentials always win over the payload.
  - **enforce:** the payload id is ignored in all cases.
- Rollout order: deploy server in `report` → deploy client that sends tokens → watch the log until legacy claims stop → set `enforce`. Old clients after that connect as anonymous: viewing works, their own rooms are not visible until they reload (the service-worker update prompt exists).

### 2.5 Second tab (D6)
Unchanged: if the verified user already has a connected client, the new socket gets a fresh random id (`isAnonymized: true`), unique PeerJS id per tab. This is no longer a security boundary; it cannot end the host tab's broadcast (as after #152).

### 2.6 Client
- `connectSocket` gets the `auth` function. Source of the login JWT: whatever `JwtInterceptor` reads (to be confirmed in code). Anonymous token stored with `CacheService` for 7 days.
- Handles `anonymousToken` in `set user id success`, and `auth failed` (clear the stale login token state the way the app already does for a 401; exact handling confirmed when reading `JwtInterceptor`).
- Identity can only change at connect time, so a login/logout in the same page session must reconnect the socket. To verify in code: login is an OAuth redirect (fresh page load), which would make this automatic.

## 3. Test plan (every new test is shown failing against the old code first)
| Layer | Tests |
|---|---|
| Unit: `SocketIdentityService` | valid account; valid anonymous; none (issues id and token); expired; wrong signature; anonymous token as `token` rejected; account token as `anonymousToken` rejected; missing `sub`; mode parsing (default report, unknown → enforce) |
| Unit: gateway | foreign payload id ignored (both modes when a credential exists); real id echoed; report: legacy claim accepted and counted; enforce: ignored; second concurrent client anonymised, no token issued; `auth failed` sent |
| Unit: `SessionService` | registration uses the verified id |
| **Integration** (real socket.io server and `socket.io-client`, real `SessionService`/gateway over `test/in-memory-model.ts`) | **the attack:** B claims A's id while A is disconnected → cannot end A's broadcast, does not move `hostClientId`, does not receive A's rooms (enforce); the same attack succeeds in `report` mode without credentials (documents the stage); A reconnects with a valid token and keeps hosting; an anonymous host's token survives a reconnect; an invalid token connects as anonymous with `auth failed` |
| Client | `auth` function returns the latest tokens; `anonymousToken` stored and reused; payload id mismatch adopted |
| Manual, local stack | built server on `PORT=3100` against local MongoDB, minted dev JWT (secret from `.env.serve.development`, never printed), two socket clients; clean up test data. Not verifiable here: the real login flow (CORS/Azure redirect) and Azure Cosmos DB. |

## 4. Size and commits
~15 files: `socket-identity.service.ts` (+spec), `session.gateway.ts` (+spec), `AppModule`, `SessionService` (if any change is needed), integration spec, `peer.service.ts` (+spec), docs. `socket.io-client` 4.7.1 is already in `node_modules` (via `ngx-socket-io`) but is **not** listed in the root `package.json`; importing it from a server test needs no install, but a declared dependency would mean touching `package.json` and the lock file. I will tell the human before doing that. Commits: `test(server)` attack reproduction (failing) is folded into the commit that fixes it; `feat(server)` identity service; `fix(server)` gateway enforcement (security, own commit); `feat(client)` handshake; `docs(aidlc)`.

## 5. Risks and second-order effects
- Old clients during rollout: handled by `report`; the gate is `enforce`.
- Token in handshake `auth`: socket.io 4.4 supports `auth` (client 4.7.1 sends it; server `socket.handshake.auth`). Verify in the integration test, since the server is pinned to 4.4.0.
- Expired login JWT (1 day): the user becomes anonymous, not disconnected (D3); the hosting broadcast of that user then can't be ended by the same person until they log in again. That is the intended trade-off; the `auth failed` message lets the UI say so.
- A reconnect with a valid token while the old socket is still registered: `isAnonymized` would trigger for the *new* socket if the old one is still `connected` in the server. This exists today; the integration test covers the reconnect case so the behaviour is recorded rather than assumed.
- `SocketConnection` documents are keyed by user id; anonymous ids accumulate as before (no cleanup change).

## 6. Not yet verified
Middleware via `afterInit` under `@nestjs/websockets` 10 with socket.io 4.4.0; behaviour on Azure Cosmos DB; the client login/logout path in §2.6.

## 7. Deviations from this design (as built)
- `auth failed`: the client logs it and carries on as an anonymous user. No login prompt was added; the startup session check (`/validate`) is what logs an expired user out.
- The anonymous token is stored per tab in `sessionStorage` through `CacheService` (7 days), not in local storage: it proves the per-tab anonymous id, which is also per tab.
- The client reconnects its socket when the stored login token differs from the one it connected with (login or logout while connected), since identity is only decided at connect. Login arrives by an OAuth redirect to `/login?id_token=…` and the socket can already be connected by then, so this is needed.
- Anonymous tokens are not renewed; after 7 days an anonymous host gets a new id.
- Dependencies: none added. The server uses `JwtService` from `@nestjs/jwt` (already declared); the integration spec imports `socket.io-client`, which is installed through `ngx-socket-io` but not declared in `package.json`.
