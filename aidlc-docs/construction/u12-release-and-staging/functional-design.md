# U12 — Release candidate and Azure staging environment: Functional Design

**Status:** v3, **approved 2026-10-15**; implementation in progress on `feature/azure-staging` (deviations will be recorded in a final section). Answered 2026-10-15: R1 (v0.5.0, `release/v0.5.0`, `v0.5.0-rc.1`), R2 (**ephemeral staging with a MongoDB container, not Cosmos**), R3 (second Static Web App, `next.zipcaptions.app` / `next-api.zipcaptions.app`), R4 (deploy on `release/**` pushes + manual), provisioning (I write the `az` script and workflow; the human runs and reviews them). **The entire environment is ephemeral, not only the database (human, 2026-10-15; v2 wrongly kept the resource group, environment, Static Web App and domains between candidates).** Answered on 2026-10-15 as well: R10 (destroy on deletion of `release/*` + manual dispatch), R11 (**DNS updated by hand per candidate**), R13 (empty pre-created resource group + principal scoped to it). R5–R9 and R12 stand as recommended. The human approved the design as a whole.
**Goal:** (1) cut a release candidate from `develop` with git flow; (2) replace the homelab staging server with an **ephemeral** staging environment on Azure that exists only while a release candidate does, deployed by the same kind of automated pipeline as production, so the candidate can be tested (including `SOCKET_AUTH_MODE=enforce` / `PEER_AUTH_MODE=enforce`) before it reaches production.
**Not in scope:** changing production's architecture, the on-device translation feature itself, infrastructure for other environments.

## 1. Current state (read from the repo, 2026-10-15)

Release process
- git flow is configured (`main`/`develop`, `release/`, `hotfix/`, no version-tag prefix; git-flow AVH 0.4.1 is installed). The previous release was `release/v0.4.0`: a `chore(release): bump version to 0.4.0` commit (`package.json`; the lock file also carries `"version": "0.4.0"`), then `git flow release finish`, which merged to `main` with tag `v0.4.0` and back to `develop`.
- `develop` is at `b54d2d7`, **149 commits ahead of `main`** (`v0.4.0`, `b82ab58`). `main` has 4 merge commits `develop` lacks (earlier release/hotfix merges); `finish` will back-merge them.
- **Merging to `main` deploys production**: `.github/workflows/deploy.yml` runs on `push` to `main` (and by hand). So a release must be validated *before* `git flow release finish`. That is the point of the candidate.
- `release_notes.md` was last updated for v0.0.12 (2023); it is not the current practice.
- Open gate (human, 2026-10-14): the on-device translation feature is not released until production runs `SOCKET_AUTH_MODE=enforce`. Both `SOCKET_AUTH_MODE` and `PEER_AUTH_MODE` default to `report` and **neither is set by `deploy.yml`**, so production would currently deploy in `report`.

Production deployment (`deploy.yml`)
- `identify_affected` runs `nx print-affected` and the client and server jobs run when those projects are affected.
- Client: `npm run build:client` (Nx `production` configuration; the client reads `packages/client/<configuration>.env` for its `ZIP_*` URLs at build time, `production.env` → `api.zipcaptions.app`), deployed with `Azure/static-web-apps-deploy` (`app_location: /docs`, the build output), secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- Server: Docker image built from the `prod_server` target, pushed to Docker Hub as `educoder/zip-captions-server:<sha>`, deployed with `azure/container-apps-deploy-action` to the container app `zip-captions-server` in resource group `ZipCaptions`, with secrets as `secretref:` and `APP_ORIGIN=https://zipcaptions.app` (the server's only CORS origin, `main.ts`). MongoDB is Azure Cosmos DB (port 10255). Azure login is the `AZURE_CREDENTIALS` secret.
- The image deployed to production is **rebuilt** from `main`, not the artefact that was tested.

The old staging (homelab, no longer available)
- `Dockerfile` has `staging_*` targets; `packages/client/staging.env` points at `https://next-api.zipcaptions.app` (the homelab); `npm run build:client:staging` builds with the Nx `staging` configuration, which has **optimization off** (a development-style build), so it does not test the artefact that ships.
- `.env.serve.staging` (local, not committed) exists for running the server by hand.

- **The server chooses its database mode from `APP_ORIGIN`** (`getDbConnectionData`, `app.module.ts`): an origin containing `localhost` connects to plain MongoDB without TLS; one containing `next` uses `MONGO_DB_URL` as a **complete connection string** with `retryWrites: true`; anything else is production: `mongodb://URL:PORT/NAME?ssl=true&replicaSet=globaldb`, `retryWrites: false` (Cosmos DB). So a staging origin of `https://next.zipcaptions.app` takes the middle branch, which suits a MongoDB container, and **never runs production's Cosmos branch**.

What is not available here: the Azure CLI (`az`) is not installed and no Azure credentials are present in this session. Nothing in Azure can be created or inspected from here; I can write the workflow, scripts and docs, and a person with access (or a session given access) runs the provisioning.

## 2. Release candidate (git flow)

Proposed steps, all local until the human says push:
1. Confirm `develop` is what should ship (list of units merged, CI green, nothing half-merged; the translation feature's gate is stated in the release notes).
2. `git flow release start v0.5.0` from `develop` (branch `release/v0.5.0`, matching `release/v0.4.0`). Version: **0.5.0**, a minor bump (new user-visible features since 0.4.0: caption segments, bilingual locales, on-device translation, PiP feed switch, settings persistence; plus the identity changes).
3. `chore(release): bump version to 0.5.0` (`package.json` and the lock file's two `version` fields). Only release-specific fixes land on this branch afterwards.
4. Tag the candidate `v0.5.0-rc.1` on the release branch tip (an annotated tag; further candidates are `-rc.2`, …). `git flow release finish` later creates the real tag `v0.5.0` on `main`; the `-rc` tags stay as history.
5. Push `release/v0.5.0` and the tag: this triggers the staging deploy (§3.5) and, on a PR, the Tests workflow. Pushing the branch does **not** deploy production (only `main` does).
6. Test on staging. Findings are fixed on the release branch (and tagged `-rc.2`). When accepted: switch production to `enforce` per `construction/backlog-socket-auth-enforce.md` (separate decision), then `git flow release finish v0.5.0`, push `main`, `develop` and tags.

## 3. Staging on Azure

### 3.1 Shape
A second, smaller copy of production, isolated from it: its own container app, its own database, its own client hosting, its own secrets (the staging OAuth apps and their redirect URIs already exist). Nothing in staging may read or write production data or use production secrets.

### 3.2 Components (names illustrative; the human owns naming and subscription)
| Component | Production today | Staging proposal |
|---|---|---|
| Server | container app `zip-captions-server`, RG `ZipCaptions`, ingress external, port 3000 | container app `zip-captions-server-staging` in its own ephemeral Container Apps environment, **max 1 replica** (the PeerJS realm and socket registrations live in server memory; two replicas would split peers), min replicas 0 or 1 (R6) |
| Database | Cosmos DB for MongoDB (port 10255) | a **MongoDB container app** (official `mongo` image, internal-only TCP ingress on 27017, root credentials from secrets), created and destroyed with the candidate (R2, R10, R12) |
| Client | Azure Static Web Apps | an ephemeral second Static Web App (R3) |
| Domain | `zipcaptions.app`, `api.zipcaptions.app` | `next.zipcaptions.app` / `next-api.zipcaptions.app` (the names the repo already uses) or the generated `*.azurestaticapps.net` / `*.azurecontainerapps.io` (R3) |
| Image | `educoder/zip-captions-server:<sha>` on Docker Hub | same repository, tag `staging-<sha>` and the rc tag |
| Secrets | container-app secrets via `secretref:` | its own set: `JWT_SECRET`, `SESSION_SECRET`, DB credentials, OAuth client ids/secrets for staging redirect URIs, Patreon (or disabled, R7), Azure Speech key |

### 3.2a Ephemeral lifecycle (the whole environment)
Staging is not a standing environment. **Everything Azure that makes it up is created for a release candidate and deleted when the candidate is over**: the resource group contents, the Container Apps environment, the server and MongoDB container apps, the Static Web App, certificates and any volume. Nothing keeps costing money or accumulating data between candidates, and every candidate starts from empty.
- **Create:** the first staging deploy of a release branch provisions everything from a template in the repository (Bicep, or an `az` script) and is idempotent, so a later push to the same release branch (`-rc.2`) updates it in place.
- **Destroy:** when the candidate is over (R10): on deletion of the `release/*` branch, or by a manual teardown dispatch. Teardown wipes the staging scope by name; it must be unable to touch production (R13).
- **Secrets are generated, not stored:** the Static Web App deployment token is read from Azure by the workflow (`az staticwebapp secrets list`) at deploy time; the MongoDB root password and the staging `JWT_SECRET`/`SESSION_SECRET` are generated randomly per candidate and handed to the apps. The only long-lived secrets are the staging service principal's credential and the third-party provider secrets (OAuth, Speech key, Docker Hub) in the GitHub `staging` environment.
- **The hard part is what lives outside Azure and is not ephemeral by nature:** DNS names and OAuth redirect URIs. A recreated environment gets new default hostnames (a Container Apps environment has a random default domain, a Static Web App a random hostname), so `next.zipcaptions.app` / `next-api.zipcaptions.app` must be re-pointed on every candidate, and Google/Azure/Patreon only redirect to URIs registered with them. §3.2b decides how (R11).
- **The client needs the API URL at build time** (`ZIP_*` values baked in by webpack): the workflow provisions first, learns the final API hostname, then builds the client. With custom names the URL is known up front; with generated names it is read from the provisioning output.

### 3.2b Names, DNS and OAuth for a disposable environment (R11)
The chosen names (R3) are stable (`next`, `next-api`) while their targets change on each candidate. Three ways to make that work:
1. **Automate DNS in the workflow** (recommended): the workflow creates/updates the `next-api` CNAME (and the `asuid` TXT validation record) and the `next` CNAME in whichever DNS service hosts `zipcaptions.app`, using an API token held in the `staging` environment, and removes them at teardown. Then OAuth redirect URIs on `next-api.zipcaptions.app` are registered with each provider **once** and stay valid. Needs: where `zipcaptions.app` DNS is hosted and a scoped API token (only the human knows both).
2. **Manual DNS per candidate:** the workflow prints the target values and pauses (or the human updates DNS after the first deploy); the custom-domain binding and certificate then complete. Works anywhere, adds a manual step to every candidate and every teardown.
3. **Generated hostnames only:** no DNS, but OAuth redirect URIs would have to be registered per candidate (not scriptable for every provider), so staging could not test real login; only the guest/anonymous path. Not recommended: login is a main thing to test.

### 3.2b-1 Consequences of manual DNS (R11 = b)
- **Two phases per candidate.** Phase 1 (push of the release branch): provision everything on default Azure hostnames; build the client for `https://next-api.zipcaptions.app` (known up front, so it can be baked in); the workflow summary prints the exact DNS records to create (CNAMEs for `next` and `next-api`, and the TXT validation records Azure asks for). Phase 2 (re-run of the workflow, or a manual dispatch with `bind_domains`) binds the custom domains and managed certificates once DNS resolves and waits for them. Until then the environment is reachable only by its default hostnames and login cannot work (the registered OAuth redirect URIs are on `next-api`).
- **The DNS records are the human's to remove at teardown.** The teardown summary lists them. A CNAME left pointing at a deleted `*.azurestaticapps.net` / `*.azurecontainerapps.io` name is a dangling record (subdomain-takeover risk if the target name can be claimed); the runbook makes deleting them part of closing a candidate.
- **OAuth is already in place** (human, 2026-10-15): the `next` / `next-api` registrations for Google, Microsoft and Patreon already exist, so nothing is registered per candidate or for the first one. The paths the server expects are `https://next-api.zipcaptions.app/v1/user/{google,azure,patreon}-redirect` (from the homelab's `.env.serve.staging`); the workflow takes them from the same names. Two things to watch: the homelab used `APP_ORIGIN=http://next.zipcaptions.app` (plain http) but the new staging serves **https**, so the CORS origin must be exactly `https://next.zipcaptions.app` (it still contains `next`, which keeps the staging database branch); and the Apple redirect (`apple-redirect`, was http) was not mentioned as registered, so Apple sign-in is treated as not available in staging unless the human says otherwise.

### 3.2c Permission boundary (R13)
Creating a resource group (or a whole environment) needs rights above a single resource group. A service principal with subscription-level Contributor could also modify production. Options: (a) a **pre-created empty resource group `ZipCaptions-Staging`** (free, holds nothing between candidates) and a service principal that is Contributor **on that group only**; teardown empties it (a Bicep "complete mode" deployment of an empty template, or deleting its resources by name). The group is a permission boundary, not an environment. (b) subscription-wide rights, creating and deleting a whole group per candidate: fully ephemeral but a broader credential in CI. *Recommend (a).*

### 3.3 Server configuration for staging
`APP_ORIGIN` = the staging client origin; `SOCKET_AUTH_MODE=enforce` and `PEER_AUTH_MODE=enforce` (staging should test the stage production is going to; a report-mode run can be done once by hand); `MONGO_DB_URL` is the full connection string of the MongoDB container (`mongodb://<mongo app name>:27017`, the environment's internal DNS name; the `isStaging` branch, because `APP_ORIGIN` contains `next`), with `MONGO_DB_USER`/`MONGO_DB_PASSWORD` and `MONGO_DB_NAME` from staging secrets. The `isStaging` branch is selected by the substring `next` in `APP_ORIGIN`: the staging origin must keep it. OAuth providers (Google, Azure, Patreon) each need the staging redirect URI registered with the provider: a manual step the pipeline cannot do.

### 3.4 Client build for staging
The client reads `packages/client/staging.env` (`next-api…` URLs, committed, no secrets). Change the Nx `staging` configuration to use the production build options (optimization, output hashing) with the staging env file, so the candidate is the shipping artefact with different URLs (R5).

### 3.5 Pipeline
New workflow `.github/workflows/deploy-staging.yml`, separate from `deploy.yml` (which stays production-only and unchanged):
- Triggers: `push` to `release/**` and `workflow_dispatch` (choose a ref). Not on `develop` (R4 asks whether it should be).
- Uses a GitHub **environment** `staging` holding its own secrets (`AZURE_CREDENTIALS_STAGING`, `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING`, Docker Hub). A service principal scoped to the staging resources only, so a mistake in this workflow cannot touch production.
- Jobs mirror production: build + test gate (the existing Tests workflow's commands), client build with the `staging` configuration deployed to the staging Static Web App, server image built from the `prod_server` target and deployed to the staging container app with `secretref:` environment variables (no secret values in the repository).
- `concurrency` group so a newer push supersedes a running deploy; `timeout-minutes` as in `test.yml`.

### 3.6 Promotion (R8)
Today production rebuilds from `main`. Safer: build the server image once on the release branch, tag it with the version, and have production deploy that image. That changes `deploy.yml` and is therefore a separate, riskier step; proposed as a later unit, not part of this one.

### 3.7 Retirement of the homelab path
The `staging_*` Docker targets, `build:client:staging`, `next-api` URLs and `.env.serve.staging` are homelab leftovers. After the Azure staging works, remove or retarget them in the same unit (R9).

## 4. Risks and what is not verifiable here
- No Azure access: I cannot create, inspect or test any resource. I will ship the workflow and a provisioning script (`az` commands, reviewed by the human before running) and state plainly that the first deploy is the first test.
- **Cosmos DB is still untested.** U10/U11 were verified against local MongoDB only, and a MongoDB container in staging does not change that: staging never runs production's Cosmos branch (`ssl=true`, `replicaSet=globaldb`, `retryWrites: false`), nor Cosmos' query/operator differences. The risk moves to production's first run. Mitigation, if wanted (not part of this unit): a one-off run of the integration scripts against a temporary Cosmos account, or a feature-flagged canary in production; decide before `release finish`.
- OAuth: the staging redirect URIs are already registered (Google, Microsoft, Patreon), but real logins work only once DNS points `next-api` at the new environment (phase 2) and cannot be tried from here.
- Cost: a second Cosmos account and container app cost money (serverless Cosmos and scale-to-zero reduce it; the human decides).
- `deploy.yml` uses deprecated `::set-output` and older action versions; noted, not touched.
- A release branch pushed to the remote deploys to staging only, but a mistake in a new workflow could deploy somewhere unintended; hence the separate service principal.

## 5. Decisions (recommendation first)
- **R1 — Version and name. ANSWERED:** `v0.5.0`, branch `release/v0.5.0`, candidate tag `v0.5.0-rc.1`.
- **R2 — Staging database. ANSWERED:** an ephemeral MongoDB container, existing only while a release candidate does (the human's choice over a Cosmos DB account). Consequence recorded in §4: staging does not test the Cosmos branch.
- **R3 — Client hosting and names. ANSWERED:** a second Static Web App with custom domains `next.zipcaptions.app` and `next-api.zipcaptions.app`.
- **R4 — Deploy trigger. ANSWERED:** pushes to `release/**` plus manual dispatch; `develop` is not deployed.
- **R5 — Staging client build.** (a) **Production build options with the staging env file**, (b) keep the unoptimised development-style build. *Recommend (a).*
- **R6 — Replicas.** (a) **max 1, min 0 (scales to zero; cold start when idle)**, (b) max 1, min 1. *Recommend (a) for cost, (b) if cold starts get in the way of tests.*
- **R7 — Patreon and Azure Speech in staging.** (a) **Staging OAuth apps for Google/Azure; Patreon webhook off or a test app; shared Speech key with a low cap**, (b) full parity. *Recommend (a); the human knows the provider setup.*
- **R8 — Promote the tested image to production.** (a) **Later unit**, (b) in this unit. *Recommend (a): it changes the production pipeline.*
- **R10 — When is staging destroyed? ANSWERED (a):** (a) **When the `release/*` branch is deleted (the end of `git flow release finish` with the remote branch removed), plus a manual teardown dispatch**, (b) on the `v0.5.0` tag or push to `main`, (c) manual only. *Recommend (a): that is exactly "the candidate is over", and the manual dispatch covers an abandoned candidate. (c) risks leaving it running.*
- **R11 — DNS and OAuth for a disposable environment. ANSWERED (b), manual DNS per candidate:** (a) **Automate the `next`/`next-api` DNS records in the workflow (needs the DNS host and a scoped token); OAuth redirects registered once**, (b) manual DNS update per candidate, (c) generated hostnames, no real login in staging. *Recommend (a); (b) if the DNS host has no usable API.* **Needs the human's answer on where `zipcaptions.app` DNS is hosted.**
- **R13 — Permission boundary. ANSWERED (a):** (a) **A pre-created empty resource group `ZipCaptions-Staging` and a service principal limited to it; teardown empties it**, (b) a subscription-scoped credential that creates and deletes a whole group. *Recommend (a): the group holds nothing between candidates, but production cannot be reached from CI staging credentials.*
- **R12 — MongoDB data across restarts.** (a) **No volume: data is lost if the MongoDB container restarts (simplest, nothing to clean up)**, (b) an Azure Files volume that lives and dies with the candidate. *Recommend (a) to start; (b) if restarts during a candidate prove annoying.*
- **R9 — Homelab leftovers.** (a) **Remove or retarget in this unit once Azure staging works**, (b) leave. *Recommend (a).*

## 6. Order of work
A workflow triggered by a push to `release/**` must exist on that branch, and the release branch is cut from `develop`, so the staging pipeline goes in first:
1. Human answers R10–R13 (R5–R9 as recommended unless changed) and approves the design.
2. On a feature branch (`feature/azure-staging`) off `develop`: the provisioning template, the deploy and teardown workflows, the `staging` Nx configuration change and a runbook (one-time setup: the empty resource group and scoped service principal, GitHub `staging` environment secrets; OAuth redirect URIs are already registered). Reviewed by the human; PR into `develop`. The one-time setup is the human's.
3. `git flow release start v0.5.0`, version bump, tag `v0.5.0-rc.1`: local; stop for the human to say push.
4. Push the release branch and tag: the first staging deploy creates everything; smoke test (login, host, view, translate; enforce modes). The first deploy is the first real test of the pipeline.
5. Findings are fixed on the release branch → `-rc.2`; then the production `enforce` plan (`backlog-socket-auth-enforce.md`), the Cosmos question (§4), then `git flow release finish`; deleting the release branch tears staging down.
