# U10 — Authenticated socket identity: Functional Design

**Status:** v1, **awaiting human approval** (nothing coded yet).
**Release blocker (decided by the human, 2026-10-14):** the on-device translation feature is not released until this is done.
**Origin:** the Qwen review of #152 (ownership of `endBroadcastSession` is only as strong as `setId`) and my own reading of `handleSetUserId`.
**Base:** branches off `feature/fix-failing-server-tests` (#152), because it changes the same gateway and `SessionService` code; see D9.

## 1. The problem (read from code)

| Item | Finding |
|---|---|
| What a socket's identity is | `SessionGateway.handleSetUserId` takes `payload.id` from the `setId` message and `SessionService.setUserId` stores it as that socket's user, **without verifying it**. The only guard is `isAnonymized`: if the user already has a connected client, the second claimant is given a fresh random id. If not, the claim is accepted. |
| Where the id comes from | The client emits `setId { id: myId }` on every connect. `myId` is the account id when logged in, otherwise a cached anonymous id; the server may answer with a different one. Anonymous ids are random UUIDs (`SocketConnection.userId` default). |
| Who can host | Anyone. Hosting needs no login (`start-broadcast` has no gate; `getBroadcastSession` accepts any known client), so there are anonymous hosts whose identity is only a self-declared random id. |
| Ids are public | Room messages carry them: `user joined room { user }`, `user left room { user: hostUserId }`, and `connect clients { clients: [peer user ids] }`. They are not secrets. |
| What a successful claim gives | (1) `setUserId` moves every live broadcast of that user to the claimant (`hostClientId`), so the claimant gets the host's join notifications; (2) the claimant can end the broadcast (`endBroadcastSession` looks it up by the claimed user); (3) `handleSetUserId` and `refreshRooms` send the claimed user's **room list** (ids and anonymous-viewing flags) to the claimant. |
| When the claim is accepted | Only while the victim has no connected client. A host with a live broadcast normally has one, but not during a reconnect or network drop, and any anonymous host's id can be claimed the same way. |
| Tokens today | A JWT (`{ sub: userId }`, 1 day) is issued at login and sent only on HTTP requests (`JwtInterceptor`, `JwtStrategy`). The socket never sends it. `JwtModule` is registered in the user and Azure-STT modules, not in `AppModule` where `SessionGateway` lives. |
| Peer server | `ExpressPeerServer` has no authentication, and the client uses the **user id as its PeerJS id** (and as the TURN username). Anyone can register an unused peer id. Not fixed by this unit; see D8. |

Net effect: "only the host's user can end a broadcast" (#152) is really "any client that can claim the host's id". The real fix is to make the id something a client can prove, not assert.

## 2. Goals and non-goals

**Goals**
- A socket's user id is established by a **server-verified credential**, never by a message payload.
- Account users prove it with the JWT they already have. Anonymous users prove it with a server-issued signed token.
- A client that merely knows someone else's id can no longer end their broadcast, take over their host notifications, or read their room list.
- Existing behaviour is otherwise unchanged: same messages, same second-tab handling, same flows for viewers.

**Non-goals (this unit):** PeerJS server authentication (D8); token refresh or revocation; rate limiting; hiding user ids from peers (not needed once ids are not bearer credentials).

## 3. Design

### 3.1 Handshake
- The client passes credentials in the socket.io handshake `auth` option, as a **function** so every reconnect sends the current values: `{ token, anonymousToken }` (the login JWT from storage, and the stored server-issued anonymous token). Not in the URL.
- The server verifies them in a socket.io middleware (`server.use`) when the gateway initialises, and records the result on `socket.data.identity = { userId, kind: 'account' | 'anonymous' }`.

### 3.2 Who is who
| Presented | Result |
|---|---|
| Valid account JWT | `kind: 'account'`, `userId = sub` |
| No account JWT, valid anonymous token | `kind: 'anonymous'`, `userId = its sub` |
| Neither | The server issues a new random id and anonymous token (below) |
| Invalid or expired token | Treated as the line above, plus an `auth failed` message so the client can prompt a new login (D3). The viewing flows keep working. |

### 3.3 Anonymous tokens
- Signed by the server with a secret **derived from `JWT_SECRET`** (HMAC of a fixed label) and an audience claim, so they cannot be used as account tokens on the HTTP API (the HTTP `JwtStrategy` would otherwise accept any token signed with `JWT_SECRET`; an anonymous id would then pass `_validateParam` and could create settings documents).
- Issued in the `set user id success` message and stored by the client; presented on later connects. Lifetime 7 days (D4).

### 3.4 `setId`
- `payload.id` is **never an identity claim**. The message remains the trigger that registers the socket (and the reply the client already waits for), but the id registered is `socket.data.identity.userId`. A payload id that differs is ignored and logged; the reply carries the real id, which the client already adopts.
- The existing `isAnonymized` rule stays for a second concurrent client of an account (it exists so each tab has a unique PeerJS id). It stops being a security boundary: a second tab with a valid token is legitimately the same user but takes a fresh anonymous identity for its peer id, as today. Consequence: it cannot end the host tab's broadcast, as today after #152.
- `handleConnection`'s "set user id" message and `refreshRooms` use the verified identity.

### 3.5 Enforcement and rollout (D7)
- `SOCKET_AUTH_MODE`: `report` (default until switched) accepts a bare `setId` id as today but logs how often, and uses tokens when present; `enforce` ignores bare ids. **The release gate is `enforce` in production.**
- Order: deploy the server (report mode) → deploy the client that sends tokens → watch the log until legacy claims stop → switch to `enforce`. Clients that are still old after that connect as anonymous and lose account features (own rooms) until they reload; the service-worker update prompt exists.

## 4. Test plan
| Layer | Tests |
|---|---|
| Unit: identity resolution | valid account token; valid anonymous token; none; expired; wrong signature; an anonymous token presented as `token` (rejected); an account token presented as `anonymousToken` (rejected); `sub` missing |
| Unit: gateway | `setId` with a foreign id is ignored (both modes where it applies); real id echoed; second concurrent client anonymised; `report` mode counts and logs a legacy claim; `enforce` mode ignores it |
| Unit: `SessionService` | registration uses the verified id; the anonymous id and token are issued once and reused |
| **Integration (real socket.io server and client, real `SessionService` over the in-memory models)** | the original attack fails: B claims A's id while A is disconnected, cannot end A's broadcast, does not get A's rooms, and A's `hostClientId` is not moved; A with a valid token reconnects and keeps hosting; an anonymous host's token survives a reconnect; an invalid token connects as anonymous with `auth failed` |
| Client | the handshake `auth` function returns the latest tokens; the anonymous token from `set user id success` is stored and reused; a payload id mismatch is adopted |
| Manual, against the local stack | server on a spare port plus the client dev server; two browser contexts with a minted dev JWT in local storage (the real login cannot run from localhost); the claim attempt fails |

Each new test is checked to fail against the old code first.

## 5. Size and commits (estimate)
About 15 files: `session.gateway.ts` (+ middleware), a small `socket-identity` service (token issue and verify), `AppModule` (JWT module), `SessionService`, `peer.service.ts` (client), their specs, and docs. Commits: server identity service + tests; gateway wiring + tests; integration test; client change + tests; `docs(aidlc)`. Keeps well under 80 counted files.

## 6. Constraints
Angular 16 rules for the client (`toObservable` only in constructors); no new dependency if `socket.io-client` is already present for the integration test (it is a dependency of `ngx-socket-io`; to be confirmed); server tests must still run without a database; the real login cannot run from localhost, so verification uses a minted token and says so; no secrets in the repo.

## 7. Decisions (each with a recommendation)

1. **Scope: accounts and anonymous users.** *Recommend:* both. Anonymous hosts exist and their random ids are as claimable as account ids. *Alternative:* accounts only, which leaves anonymous hosts exposed, or require login to host (a product change, not mine to make).
2. **Where the credential travels.** *Recommend:* the handshake `auth` option, as a function. One check per connection, not in the URL, reconnects pick up current tokens. *Alternative:* in the `setId` message (verified per message; messages could then be sent before verifying).
3. **Invalid or expired token.** *Recommend:* connect as anonymous and send `auth failed`, so viewing keeps working and the UI can ask for a login. *Alternative:* refuse the connection (stricter, but an expired token would break viewing too).
4. **Anonymous token.** *Recommend:* signed with a key derived from `JWT_SECRET`, with an audience claim, lifetime 7 days, stored in local storage. *Alternative:* reuse `JWT_SECRET` directly (simpler, but an anonymous token then works on the HTTP API).
5. **`setId` payload id.** *Recommend:* never an identity claim (ignored, logged). *Alternative:* accept it only when it equals the authenticated id (same effect, more code).
6. **Second tab of an account.** *Recommend:* keep the `isAnonymized` behaviour (unique peer id per tab; it cannot end the host tab's broadcast). *Alternative:* let all tabs share the account id, which breaks PeerJS id uniqueness.
7. **Rollout.** *Recommend:* `SOCKET_AUTH_MODE` with `report` then `enforce`, and the release gated on `enforce`. *Alternative:* enforce immediately (simplest; old clients lose account features until they reload).
8. **PeerJS server identity.** *Recommend:* out of scope for this unit but **recorded as its own release-blocking follow-up (U11)**: the peer id is the user id and the peer server has no authentication. *Alternative:* include it here (larger: it needs a key or a token check in the peer server, and PeerJS client changes).
9. **Branch and PR.** *Recommend:* branch off #152 (done); open the PR against `develop` once #152 merges, in the meantime keep the branch pushed. *Alternative:* a PR stacked on #152 now (CodeRabbit may not review a non-default base; I have not verified that).
10. **Verification.** *Recommend:* the integration test plus the manual local check in §4, with the limits stated. *Alternative:* integration test only.

## 8. Not verified yet
Whether `socket.io-client` is importable from the server tests without adding a dependency; that `server.use` middleware works with the gateway lifecycle in `@nestjs/websockets` 10 with socket.io 4.4 (`socket.io` is pinned at 4.4.0 in `package.json`); the behaviour on Azure Cosmos DB (production) of the existing queries.
