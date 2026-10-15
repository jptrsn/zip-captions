# U11 — Authenticated PeerJS Identity: Functional Design

**Status:** v1 DRAFT, **not approved**. Decisions P1–P10 (§7) were answered on 2026-10-14: all recommendations accepted (P1 = A, P2 = viewer check in U11 after A, P3 = 1 hour + refresh, P4–P10 as recommended). The human has **not yet given explicit approval of the design as a whole**; no code until then.
**Branch:** `feature/authenticate-peer-identity`, off `feature/authenticate-socket-identity-impl` (U10, PR #154, is still open on 2026-10-14). U11 builds on U10's `SocketIdentityService` and handshake. Local only until the human asks for a PR; if #154 merges first, rebase onto `develop`.
**Priority (human, 2026-10-14):** U11 is a **follow-on issue, not a release blocker**. It is identical on `main`: `peer-server.service.ts` is unchanged between `main` and `develop`, and `main` already does `new Peer(this.myId, …)`. There is no deadline, so this design favours care over speed.
**Goal:** a PeerJS id can be registered only by the party that the socket server has verified as that user. **Not in scope:** token refresh/revocation beyond §3, rate limiting, hiding user ids, encrypting or authenticating the WebRTC data channels themselves (§2.3).

## 1. Current state (read from code, 2026-10-14)

Server
- `PeerServerService.enablePeerServer` calls `app.use(ExpressPeerServer(app.getHttpServer(), { path: 'peer-server' }))`. No other option: default `key: 'peerjs'`, `allow_discovery: false`, `alive_timeout: 60000`, `concurrent_limit: 5000`. Called from `main.ts` after the Nest app is built, before `listen`.
- Installed `peer` is **1.0.1** (`node_modules/peer/dist/index.cjs`), `peerjs` client 1.4.7, `ws` 8.16.0 (transitive, not in `package.json`), socket.io 4.4.0 / engine.io 6.1.3.
- Registration (`_onSocketConnection`): the client's WebSocket URL is `…/peer-server/peerjs?key=<key>&id=<id>&token=<token>&version=…`. All three of `id`, `token`, `key` must be present and `key` must equal the configured key (a public constant shipped in every client, so it authenticates nobody). If `id` is not registered, **whoever asks first gets it**, and the `token` they sent becomes that id's owner token. If `id` is registered, the connection is kept only if its `token` equals the stored one, otherwise the server answers `ID-TAKEN` and closes. The `token` is **chosen by the client** (PeerJS fills `randomToken()` when the app gives none) and is only a per-registration secret, not an identity.
- The server stamps `message.src = client.getId()` on every relayed message (`_configureWS`), so once registration is trustworthy, `src` of an OFFER/ANSWER/CANDIDATE is trustworthy.
- **Real extension points** (read from source, not assumed): `createWebSocketServer(options)` (option of type `(options: ServerOptions) => WebSocketServer`) lets us supply the `ws` server, and so `verifyClient` (ws 8.16 `websocket-server.js:313-340`: false/`401` rejects the upgrade before any PeerJS registration exists). `generateClientId` only affects `GET /:key/id` (harmless). `proxied` only sets express `trust proxy`. The `connection`/`disconnect` events fire **after** registration (too late to stop a squat). There is **no built-in authentication hook**. The client `token` option exists (`PeerJSOption.token`, default random) and is sent verbatim on the WebSocket URL, so a signed token can ride in it with no protocol change.
- `GET /peer-server/:key/peers` is disabled (401); `/id` returns a random UUID.

Client (`packages/client/src/app/modules/peer/services/peer.service.ts`)
- `connectPeerServer()` runs `new Peer(this.myId, CONNECT_OPTS)` (line ~329), where `myId` is the id the socket server confirmed in `set user id success`. `CONNECT_OPTS` has only STUN servers (`stun1/2.l.google.com`). `iceServers[0].username = myId` (line ~328) sets a username on a **STUN** entry, which has no credential and no effect. There is **no TURN server today**, so the "TURN username" is vestigial; if TURN is added later its username must not be the user id (out of scope here, noted).
- A second tab gets a fresh random id from the socket server (`isAnonymized`), so each tab has a unique PeerJS id (U10 §2.5, unchanged).
- Reconnects: on a signalling drop `_reconnectPeerServer` calls `peer.reconnect()`, which reuses the **same token** and `_lastServerId`. A page reload makes a new `Peer` with a new random token.
- Topology: the **host** opens data connections to viewers (`user joined room` → `_connectToPeer(data.user)`; on its own reconnect `connect clients`). The viewer never connects to the host: it accepts any incoming `DataConnection` (`peer.on('connection')`) and `_handlePeerData` applies caption data (`'recognition' in data && 'type' in data`) from **any** connection. The host asks each viewer for the join code and the viewer answers; for allow-anonymous rooms the "check" is trivial.

## 2. Threat model

### 2.1 What an attacker can do today (user ids are public: room messages carry them)
| # | Attack | Mechanism | Effect |
|---|---|---|---|
| A1 | Squat a host's peer id before the host connects | Register `id = hostId` with any token | Host's own registration gets `ID-TAKEN` (`unavailable-id`); `connectPeerServerFailure`; host cannot broadcast. Denial of service on one named user. |
| A2 | Squat a **viewer's** peer id | Same | The host's `connect(viewerId)` is routed to the attacker: the attacker receives that room's captions. For a room with a join code the attacker must still answer the host's `validateJoinCode` correctly; for an allow-anonymous room it passes trivially. Caption interception. |
| A3 | Impersonate the host to viewers | Register `hostId`, then `connect(viewerId)` | Viewers apply caption data from any connection, so the attacker's text is displayed as the host's. Caption injection. |
| A4 | Inject captions without squatting | Register **any own** peer id, `connect(viewerId)` | Same effect as A3. This needs no impersonation: it exists because the viewer does not check who the sender is. |
| A5 | Take over after a drop | Wait for the host's signalling socket to close (the registration vanishes), register first | As A1/A3 (the host's reconnect uses the old token, which no longer matches). |

### 2.2 What a fix must stop
A1, A2, A3, A5 (registration is for the verified owner only) and A4 (the receiver must know who the legitimate sender is). Fixing registration alone does **not** close A4; that is why §4.E exists.

### 2.3 What it will not stop
- WebRTC data channels between peers are not authenticated by the server at all: after the SDP exchange the server is out of the path. A fix can only make the **peer id attached to a connection** trustworthy (via `src`), not the bytes.
- A party who legitimately holds a room's join code (or any viewer in an allow-anonymous room) can still connect to the host as a viewer; that is the product.
- A stolen valid peer token can register its own id until it expires (§3). Tokens ride in the WebSocket URL, so they can appear in proxy/access logs; short lifetime and the audience/key separation limit this.
- Compromise of `JWT_SECRET`.
- Other users' ids stay public.

## 3. Candidate designs

### A. Signed peer token issued by the socket server (recommended)
1. After `setId` the gateway has a registered id for the socket (`registeredId`: the verified user, or the fresh id for a second tab). It also signs a **peer token**: HS256, key `HMAC-SHA256(JWT_SECRET, 'zip-captions/peer-server/v1')`, claims `{ sub: registeredId, aud: 'peer-server' }`, lifetime per P3. Same derivation pattern as U10's anonymous token, so a peer token cannot pass the HTTP `JwtStrategy`, cannot be a socket `token`/`anonymousToken`, and vice versa.
2. The token is sent to the client in `set user id success` (`peerToken`), and on request (`peerToken` event, answered with `peer token`) for refresh.
3. The client passes it as the PeerJS `token` option (`new Peer(myId, { …CONNECT_OPTS, token })`). The id is unchanged, so `connect(peerId)`, the room messages and the host-reconnect flow are untouched.
4. The peer server is created with `createWebSocketServer: (o) => new WebSocketServer({ ...o, verifyClient })`. `verifyClient` reads `id`, `token` from `req.url`, verifies the token, requires `sub === id`, and otherwise rejects (401) **before** PeerJS creates any registration. In `report` mode (§5) it only logs and counts.
5. Because the token is valid for only one `sub`, a squatter cannot register `hostId` without a token for it; the socket server issues those only to a socket verified (or server-assigned) as that id.

Report-mode caveat that matters: in `report` mode (U10) a client with no credential can *name* an id in `setId` and is registered under it. A peer token must therefore **never be issued for a claimed id** (`claimed` in `handleSetUserId`); otherwise the claimant would get a valid peer token for the victim. With U10 in `enforce` the question disappears, so the rollout order is socket `enforce` first (P5).

Trade-offs: no new dependency on the client; small protocol change; works with the unmodified PeerJS server and client. Costs: needs `ws`' `WebSocketServer` imported on the server (`ws` is installed through `peer` but not in `package.json`; see P8); token expiry has to be handled across a long-lived session (P3); the token appears in the WebSocket URL.

### B. Server-generated peer ids that are not user ids
The socket server assigns each socket a random peer id (mapping carried over the socket) and the host connects to those instead of user ids. Rejected as the primary fix: registration stays first-come, so anyone who learns a peer id (the host learns every viewer's from the room messages, and the server relays it) can still squat it before the owner registers; it only raises the bar from "known forever" to "known for this session". It would also change every id in the room protocol (`user joined room`, `connect clients`, `user left room`) and the host would need new ids after every socket reconnect. Useful as a hardening on top of A, not instead of it.

### C. A per-connection or shared PeerJS `key`
PeerJS has one global `key` per server (`key !== this.config.key`); it cannot be per connection without patching the library, and a shared key is shipped to every client, so it authenticates nobody. Rejected.

### D. Server-side check only (registration allowed only if the socket server has a connected socket for that user)
No new token, but it checks a state ("someone with that user id is connected") rather than binding the WebSocket to that socket, so an attacker could register the victim's id while the victim's socket is connected and before the victim's peer registers. Rejected: a token is the missing binding.

### E. (Complement to A) the viewer accepts caption data only from the room's host
Needed for A4. The server includes the host's user id in `room joined` (`hostUserId`), the viewer stores it, and `_handlePeerData` ignores caption data (and close/disconnect requests) from a `connection.peer` that is not the host. With A the `connection.peer` of an incoming connection is trustworthy. Old clients ignore the extra field; old hosts keep working with new viewers (a viewer pins whatever id the server gave it). If the server sends no `hostUserId` (old server) the viewer behaves as today. This is a separate change from A and can be a second stage (P2).

Recommendation: **A + E**, staged (A first).

## 4. Detailed behaviour (A + E)

### 4.1 Server
- `PeerIdentityService` (new, beside `SocketIdentityService`): `issue(userId)`, `verify(token) → userId | undefined`, `mode()` (§5), shared key-derivation helper factored so `SocketIdentityService` and this class do not each re-implement it.
- `PeerServerService.enablePeerServer` builds the options with `createWebSocketServer` and `verifyClient`. A rejected upgrade is logged with a running counter (never the token).
- `SessionGateway.handleSetUserId`: adds `peerToken` to `set user id success` when `!claimed` and the identity is credentialed or server-assigned. New `@SubscribeMessage('peerToken')` returns a fresh token for the id registered to that socket (`getUserFromClientId`), nothing for an unregistered socket.
- `SessionGateway.handleJoin`: `room joined` carries `hostUserId` (E).

### 4.2 Client
- `connectPeerServer` creates `Peer` with `token = this.peerToken` and stores each new `peerToken` from `set user id success`/`peer token`.
- Reconnect: `peer.reconnect()` reuses the construction-time token, which may have expired by then. Before `reconnect()` the client fetches a fresh token through the socket and sets it on the live `Peer` (`peer.options.token`; PeerJS 1.4.7 keeps it in `_options.token`, which is private, so the update is isolated in one helper with a test that fails if a PeerJS upgrade moves it). `peerjs` is pinned at `^1.4.7`; the helper verifies the field exists and falls back to constructing a new `Peer` otherwise.
- Viewers pin `hostUserId` (E).

### 4.3 Second tab, reconnects, drops
- Second tab: its id is the fresh `isAnonymized` id and gets a peer token for that id. Nothing else changes.
- Socket reconnect: `setId` runs again, a fresh `peerToken` arrives; the existing `Peer` is kept if it is still connected (current behaviour, line ~323).
- Host drop and return: the host reconnects its signalling with a refreshed token, then `join` → `connect clients` makes it reconnect to viewer peers (existing flow; the data channels it made survive a signalling drop).
- Stale registration: after a page reload the new `Peer` has a new PeerJS token while the old registration can still be in the realm until `alive_timeout` (60 s) or socket close, so the rightful owner may see `ID-TAKEN` for up to a minute. This already happens today. A verified owner could be allowed to evict its own stale registration; `realm` is not exposed by the `peer` package, so that needs closing the old ws in `verifyClient` and is **not designed here** (P7).
- Expired token: with an expired token the upgrade is rejected; the client fetches a new one via the socket and retries (§4.2).

## 5. Rollout stages
Mirrors U10. `PEER_AUTH_MODE` = `report` | `enforce`; unset → `report`; any other value → `enforce` (fail closed). Read on each call.
1. **Server in `report`** (peer tokens issued, registrations without a valid token accepted, each logged with a counter `legacy peer registration #n`). A *bad* token is also accepted in `report` but logged separately (it distinguishes a broken client from an old one).
2. **Client that sends tokens** released. Watch the log until legacy registrations stop. Old clients keep working in the meantime.
3. **`enforce`**. Old clients cannot register on the peer server (upgrade rejected, PeerJS reports a socket error, the existing `peerServerError` path); viewing as a viewer also fails until they reload (the service-worker update prompt exists). No new user-facing string is planned (P9).
4. **Pin the host** on the viewer (E) can ship in stage 2 or later; its server field is additive and safe in any order.

Ordering rule: `SOCKET_AUTH_MODE=enforce` (the U10 release gate) is expected to be in place before `PEER_AUTH_MODE=enforce`. U11 itself is not release-blocking.

## 6. Test plan (each new test is shown failing against the current code first)
| Layer | Tests |
|---|---|
| **Attack reproduction (first)** | Integration: a real http server with the peer server mounted exactly as production wires it (`PeerServerService`), and `ws` clients speaking the PeerJS wire protocol (`/peer-server/peerjs?key&id&token`). (1) Attacker registers `id = hostId` while the host is not connected, with a random token → **currently `OPEN` (the attack succeeds), must be rejected**. (2) The host then registers with its own token → currently `ID-TAKEN`, must be `OPEN`. |
| Unit: `PeerIdentityService` | valid token; expired; wrong signature; wrong audience; account JWT as peer token rejected; socket anonymous token as peer token rejected; peer token as socket token rejected; missing `sub`; mode parsing (default report, unknown → enforce) |
| Unit: `verifyClient` | missing token; token for another id; right id; wrong `key` still handled by PeerJS; report mode accepts and counts, enforce rejects with 401 |
| Unit: gateway | `peerToken` present for credentialed and server-assigned ids; **absent for a report-mode claimed id**; second tab gets a token for its own id; `peerToken` event answers only for a registered socket; `room joined` carries `hostUserId` |
| **Integration (real socket.io + real peer server)** | host verified on the socket gets a token and registers; attacker with a token for its *own* id cannot register `hostId`; a report-mode claimant of `hostId` gets no token; in `report` the unauthenticated registration still works and is counted; expired token rejected then refreshed through the socket; two sockets of one user (second tab) both register with distinct ids |
| Client | `Peer` constructed with the token; token stored from `set user id success` and `peer token`; refreshed before `reconnect()`; viewer ignores caption data from a non-host connection and accepts the host's; behaves as before when no `hostUserId` arrives |
| Manual, local stack | built server on `PORT=3100` against local MongoDB (Docker, 27017), dev JWT minted from `.env.serve.development` (secret never printed), two socket.io clients plus raw `ws` PeerJS clients; test data cleaned up afterwards. Not verifiable here: the real login flow (CORS/Azure redirect), real browsers/WebRTC, Azure Cosmos DB, the production reverse proxy (query string handling, websocket upgrade). |

Open item for the integration test: in U10 a websocket-only socket.io client was rejected by the real server. A `ws` `WebSocketServer` created with `{ server, path }` registers its own `upgrade` listener on the shared http server and `handleUpgrade` answers 400 for any path that is not its own (ws 8.16 `websocket-server.js:264`); I suspect that is the cause, interacting with engine.io's listener ordering, but have **not verified it**. It will be investigated (not worked around) before the integration test relies on it; if it is real, the fix may be part of U11 (e.g. a `noServer` ws server with our own `upgrade` routing).

## 7. Decisions (recommendation first)
- **P1 — Approach.** (a) **Signed peer token (A)**, (b) server-generated peer ids (B), (c) A + B. *Recommend (a).*
- **P2 — Scope of the viewer check (E).** (a) **In U11, as the second commit sequence after A**, (b) in U11 but together with A, (c) separate follow-on unit. *Recommend (a): A4 is only closed by E, but A stands alone.*
- **P3 — Token lifetime and refresh.** (a) **1 hour, refreshed through the socket before any `reconnect()`**, (b) 24 hours, no refresh code, (c) 5 minutes. *Recommend (a): short enough to limit a logged URL, long enough that refresh is the exception.*
- **P4 — Delivery.** (a) **`peerToken` in `set user id success` plus an on-demand `peerToken` event**, (b) only in `set user id success`. *Recommend (a).*
- **P5 — Mode switch.** (a) **Separate `PEER_AUTH_MODE` (default `report`, unknown → `enforce`), expected to follow `SOCKET_AUTH_MODE=enforce`**, (b) reuse `SOCKET_AUTH_MODE`. *Recommend (a): peer enforcement can lag socket enforcement, which is already the release gate.*
- **P6 — Report-mode token issue.** (a) **Never issue a peer token for a claimed id**, (b) issue for claimed ids too. *Recommend (a): (b) would hand a squatter a valid token.*
- **P7 — Enforcement point and stale registration.** (a) **`createWebSocketServer` + `verifyClient` (reject before registration)**; accept the existing ≤60 s `ID-TAKEN` window after a reload, no eviction, (b) as (a) plus closing the owner's stale ws in `verifyClient`, (c) check afterwards in the `connection` event (rejected: the attacker's registration exists first). *Recommend (a); revisit (b) only if the window proves a problem.*
- **P8 — Dependencies.** `verifyClient` needs `WebSocketServer` from `ws`, which is installed through `peer` but not declared. (a) **Declare `ws` (and `@types/ws`, already present) in `package.json`; I tell you before touching `package.json` and the lock file**, (b) take the class from the instance PeerJS builds (not available: it is constructed inside the library) or deep-import. *Recommend (a); your go-ahead is needed at that point.*
- **P9 — Old clients in `enforce`.** (a) **Peer registration is rejected until they reload; no new string**, (b) add a notice (would need `en.json` plus `translate.py` locales). *Recommend (a): the existing peer-server error state already shows.*
- **P10 — Hardening order inside U11.** (a) **Failing attack-reproduction test → `PeerIdentityService` + verify in `report` → gateway token + client → `enforce` default flip is a deploy-time setting only (no code)**, then E, (b) all at once. *Recommend (a), keeping security behaviour in separate commits.*

## 8. Size and commits
~12 files: `peer-identity.service.ts` (+spec), `peer-server.service.ts` (+integration spec), `session.gateway.ts` (+spec), `AppModule`, shared key helper, `peer.service.ts` (+spec), docs. Commits: `test(server)` attack reproduction folded into the enforcing commit; `feat(server)` peer identity service; `fix(server)` peer server verification (security, own commit); `feat(client)` peer token; `fix(client)` host pinning (own commit); `docs(aidlc)`.

## 9. Risks
- Old clients during rollout: `report`; the gate is `enforce`.
- A PeerJS upgrade moving `_options.token`: isolated helper plus a test; `peerjs` is `^1.4.7` and the lock file pins the installed version.
- A reverse proxy that strips or logs WebSocket query strings: not verifiable locally (production proxy unknown).
- `verifyClient` is documented by ws as legacy but supported in 8.x; a ws major upgrade must re-check it.
- Expired-token loops: refresh must be bounded (the existing `_reconnectPeerServer` caps at 5 tries) so a rejected client cannot spin.

## 10. Not yet verified
Whether `createWebSocketServer`/`verifyClient` behave as read under the real Nest + socket.io 4.4 + engine.io upgrade ordering (§6 open item); the `_options.token` update path on a live `Peer`; behaviour behind the production proxy and on Azure Cosmos DB.
