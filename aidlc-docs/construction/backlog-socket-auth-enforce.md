# Backlog: Plan the transition to `SOCKET_AUTH_MODE=enforce` (U10 follow-through)

**Status:** backlog, not planned. Added 2026-10-15 after U10 merged (#154).
**Why this is here:** the human decided on 2026-10-14 that the on-device translation feature is not released until production runs with `SOCKET_AUTH_MODE=enforce`. Merging #154 does not do that. This note records why the switch needs its own plan, and what the plan has to settle.

## 1. Where things stand
- #154 is merged. The server now verifies a socket's user id from the handshake (a login JWT, or an anonymous token the server signed). The id a client names in the `setId` message is no longer an identity claim.
- The mode is read from the `SOCKET_AUTH_MODE` environment variable on each call. **Unset, empty or `report` means report mode. Anything else (including a typo such as `enforced`) means enforce.** Only a restart changes it; there is no live toggle.
- **In `report` mode the original bug is still open.** A client that shows no valid token and names a user's id in `setId` is still given that id (and so can take over that user's broadcast, end it and read their room list while the user has no connected client). This is deliberate: old clients that predate the handshake tokens behave exactly like that attacker, so the server cannot tell them apart until they are gone. Each such claim is logged as a warning: `legacy setId claim #N: client <id> named user <id> without a valid token`.
- In `enforce` mode that same client is ignored: it is registered as a fresh anonymous user and told its new id.

## 2. Why not switch straight to `enforce`
Enforcing before old clients are gone breaks real users:
- A tab running the old client sends no tokens. Under `enforce` the server treats it as a new anonymous user. For a logged-in user that tab loses its own rooms, and a host who is mid-broadcast cannot end or resume that broadcast from the old tab until they reload.
- Old client code lingers: long-open tabs and cached service workers keep running the previous build until they reload or the service-worker update prompt is accepted. A logged-in user's JWT lasts one day and an anonymous token seven days, so tab and token lifetimes bound how long stragglers can exist, but not precisely.
- So the rollout order is: deploy the server in `report` (default; nothing to configure) → deploy the client that sends tokens → watch for the legacy-claim log lines to stop → set `enforce` and restart.

## 3. What the plan has to decide
1. **The signal and the threshold.** The only signal is the log line above, plus a counter that lives in server memory: it restarts at zero on every restart and is per instance if more than one instance runs. There is no metric or dashboard. Decide what "stopped" means (for example: no lines for N days, or fewer than M per day), where the logs are read (Azure log stream, Log Analytics or similar; I have not seen the production setup), and who checks. Consider whether a small log-derived count is worth adding first.
2. **How long to wait.** At least long enough to cover the one-day login token and the weekly tail of long-lived tabs; the human sets the number. Note the legacy lines can also come from users who never return, so a hard zero may never arrive. Decide what residual rate is acceptable.
3. **Who is hurt at the switch and what they see.** Stragglers on the old client become anonymous (see §2). Decide whether to tell users (release note, the service-worker update prompt, a banner) and whether to time the switch away from peak use. A host broadcasting at the moment of the restart is already disrupted by the restart itself.
4. **Where the setting lives in production.** How environment variables reach the production server (the human knows; not recorded here), how to change it, and that a restart is required. Staging first: it also has to be on `enforce` so that the real login and logout flows (OAuth redirect to `/login?id_token=…`, token removal on logout) are exercised, which cannot be done from localhost.
5. **Rollback.** Set the variable back to `report` (or unset it) and restart. State this in the plan so nobody has to work it out during an incident. Decide the trigger (for example a spike in "my rooms disappeared" reports).
6. **How to confirm it worked.** After the switch: no new `legacy setId claim` lines; a host with a valid token keeps their broadcast across a reconnect; a client that only knows the host's id cannot take the broadcast over. The local check used for U10 (a built server on a spare port, a minted JWT, two sockets) is a template, but it ran against local MongoDB only and is not a production test.
7. **Clean-up afterwards.** Once `enforce` has been stable for a while, the `report` branch (`recordLegacyClaim`, the `claimed` handling in `handleSetUserId`) can be removed, which also removes the reply that still exposes the live room in report mode. Decide whether to do that or keep `report` as an emergency fallback.

## 4. Known limits that the plan should state plainly
- The production database is Azure Cosmos DB; U10 was tested against local MongoDB only.
- The real login flow could not be run end to end; the client's reconnect on login and logout is covered by unit tests only.
- U11 (the PeerJS server has no authentication; the peer id is the user id) is separate, identical on `main`, and does not block this. Enforcing the socket does not close it.

## 5. Where to read more
`construction/u10-socket-identity/functional-design.md` (design, rollout §2.4, deviations §7), the U10 entries in `audit.md`, and the PR description of #154.
