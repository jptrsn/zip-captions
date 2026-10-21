# Staging environment (ephemeral)

Staging exists only while a release candidate does. Pushing a `release/**` branch creates it (or updates it for the next candidate), deleting the branch removes it. Design and reasons: `aidlc-docs/construction/u12-release-and-staging/functional-design.md`.

| Piece | File |
|---|---|
| Everything Azure that makes up staging | `main.bicep` |
| Create or update (pushes to `release/**`, or run by hand) | `.github/workflows/deploy-staging.yml` |
| Remove everything (release branch deleted, or run by hand) | `.github/workflows/teardown-staging.yml` |

Production (`deploy.yml`, from `main`) is separate and untouched. Nothing here can reach it: the CI credential is limited to the staging resource group.

## One-time setup (done once, by a person with Azure and GitHub admin rights)

1. **Providers.** The subscription needs `Microsoft.App`, `Microsoft.OperationalInsights` and `Microsoft.Web` registered (`az provider register --namespace <name>`). The CI principal cannot do this.
2. **The empty resource group.** It holds nothing between candidates and costs nothing; it is the permission boundary.
   ```
   az group create --name ZipCaptions-Staging --location <region of your choice>
   ```
   The name must contain `staging` (the workflows refuse any other). To use another name, set the GitHub environment variable `STAGING_RESOURCE_GROUP`.
3. **A service principal limited to that group.** Never at subscription scope.
   ```
   az ad sp create-for-rbac --name zip-captions-staging-ci --role Contributor \
     --scopes /subscriptions/<subscription id>/resourceGroups/ZipCaptions-Staging
   ```
   Put its output into one JSON object for the secret `STAGING_AZURE_CREDENTIALS` (not `AZURE_CREDENTIALS`: that is production's repository secret, and a job that lacks its own secret of the same name would silently use it):
   ```
   {"clientId": "<appId>", "clientSecret": "<password>", "subscriptionId": "<subscription id>", "tenantId": "<tenant>"}
   ```
4. **The GitHub environment `staging`** (Settings → Environments), with these secrets (the OAuth apps already exist for `next` / `next-api`):

   | Secret | What |
   |---|---|
   | `STAGING_AZURE_CREDENTIALS` | the JSON above |
   | `STAGING_SECRET_SEED` | any long random string; the database password, `JWT_SECRET`, `SESSION_SECRET` and the Patreon webhook secret are derived from it. Changing it rotates all of them |
   | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | the staging Google app |
   | `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | the staging Microsoft (Azure) app |
   | `PATREON_CLIENT_ID`, `PATREON_CLIENT_SECRET` | the staging Patreon app |
   | `AZURE_SPEECH_KEY` | a speech key (a capped one is advisable) |

   `DOCKER_USERNAME` and `DOCKER_PASSWORD` are the repository secrets production already uses. Optionally a variable `STAGING_RESOURCE_GROUP`.
5. **Apple sign-in** is not set up for staging (no registration was recorded for it).

## For each release candidate

1. **Push the release branch** (and the `-rc` tag). The workflow runs the tests, builds the server image (`educoder/zip-captions-server:staging-<sha>`), creates or updates everything in `ZipCaptions-Staging`, builds the client for `https://next-api.zipcaptions.app` and deploys it. A later push to the same branch updates the environment in place.
2. **Create the DNS records** listed in the run's summary (a new environment has new hostnames):
   - `CNAME next.zipcaptions.app` → the Static Web App's default hostname
   - `CNAME next-api.zipcaptions.app` → the server's default hostname
   - `TXT asuid.next-api.zipcaptions.app` → the verification id
3. **Run the workflow again by hand** on the release branch with **bind_domains** ticked, once the records resolve. It attaches the custom domains and the managed certificates (a few minutes). Until then login cannot work, because the OAuth redirect URIs are on `next-api.zipcaptions.app`. Every later push redeploys the template, which removes the API's custom domain; the workflow's "Keep the API custom domain bound" step puts it back when the CNAME already points at the app, so no further dispatch is needed.
4. **Test.** The server runs with `SOCKET_AUTH_MODE=enforce` and `PEER_AUTH_MODE=enforce`, one replica at most (the PeerJS realm and the socket registrations are in its memory), scaling to zero when idle. The MongoDB container is standalone with no volume: its data is lost if it restarts.
5. **Finish the candidate.** `git flow release finish`, then delete the remote `release/…` branch: that runs the teardown. For an abandoned candidate, run **Tear down staging** by hand. **Delete the three DNS records yourself**: a CNAME left pointing at a deleted Azure hostname is a dangling record.

## What this does not test

The server picks its database settings from `APP_ORIGIN` (`getDbConnectionData`): the staging origin contains `next` and gets a plain connection string, so staging never runs production's Azure Cosmos DB settings (`ssl=true`, `replicaSet=globaldb`, `retryWrites: false`), nor Cosmos' behaviour.
