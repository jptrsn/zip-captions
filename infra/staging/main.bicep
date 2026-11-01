// The ephemeral staging environment for a release candidate (aidlc-docs/construction/u12-release-and-staging).
// Deployed into the pre-created, otherwise empty resource group by .github/workflows/deploy-staging.yml, and
// emptied again by teardown-staging.yml. Everything here is disposable: nothing in it holds data worth keeping.

@description('Region of the container apps environment, the apps and the log workspace')
param location string = resourceGroup().location

@description('Static Web Apps are available in a few regions only')
param swaLocation string = 'westus2'

@description('The server image, built from the prod_server target and pushed by the workflow')
param serverImage string

@description('MongoDB for the candidate. Standalone and without a volume: its data lives and dies with the candidate.')
param mongoImage string = 'mongo:7'

@description('The client origin. It must contain "next": the server picks its staging database settings from that (getDbConnectionData).')
param appOrigin string = 'https://next.zipcaptions.app'

@description('The public API origin; the OAuth redirect URIs registered with the providers are under it')
param apiOrigin string = 'https://next-api.zipcaptions.app'

@allowed(['report', 'enforce'])
param socketAuthMode string = 'enforce'

@allowed(['report', 'enforce'])
param peerAuthMode string = 'enforce'

param azureSpeechRegion string = 'eastus'

@secure()
param mongoPassword string
@secure()
param jwtSecret string
@secure()
param sessionSecret string
@secure()
param googleClientId string
@secure()
param googleClientSecret string
@secure()
param azureClientId string
@secure()
param azureClientSecret string
@secure()
param patreonClientId string
@secure()
param patreonClientSecret string
@secure()
param patreonWebhookSecret string
@secure()
param azureSpeechKey string

// Fixed names: the DNS records, the teardown and the runbook rely on them
var workspaceName = 'zip-staging-logs'
var environmentName = 'zip-staging-env'
var mongoAppName = 'zip-mongo-staging'
var serverAppName = 'zip-captions-server-staging'
var staticSiteName = 'zip-captions-staging'
var mongoUser = 'zipstaging'
var mongoPort = 27017

resource workspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource environment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: workspace.properties.customerId
        sharedKey: workspace.listKeys().primarySharedKey
      }
    }
  }
}

// Reachable only from other apps in the environment, by the app name and port
resource mongo 'Microsoft.App/containerApps@2024-03-01' = {
  name: mongoAppName
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: false
        transport: 'tcp'
        targetPort: mongoPort
        exposedPort: mongoPort
      }
      secrets: [
        { name: 'mongo-password', value: mongoPassword }
      ]
    }
    template: {
      containers: [
        {
          name: 'mongo'
          image: mongoImage
          resources: { cpu: json('0.5'), memory: '1Gi' }
          env: [
            { name: 'MONGO_INITDB_ROOT_USERNAME', value: mongoUser }
            { name: 'MONGO_INITDB_ROOT_PASSWORD', secretRef: 'mongo-password' }
          ]
        }
      ]
      // Always one replica: scaling the database to zero would drop the candidate's data
      scale: { minReplicas: 1, maxReplicas: 1 }
    }
  }
}

resource server 'Microsoft.App/containerApps@2024-03-01' = {
  name: serverAppName
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
        transport: 'auto'
        allowInsecure: false
      }
      secrets: [
        { name: 'mongo-db-password', value: mongoPassword }
        { name: 'jwt-secret', value: jwtSecret }
        { name: 'session-secret', value: sessionSecret }
        { name: 'google-client-id', value: googleClientId }
        { name: 'google-client-secret', value: googleClientSecret }
        { name: 'azure-client-id', value: azureClientId }
        { name: 'azure-client-secret', value: azureClientSecret }
        { name: 'patreon-client-id', value: patreonClientId }
        { name: 'patreon-client-secret', value: patreonClientSecret }
        { name: 'patreon-supporter-webhook-secret', value: patreonWebhookSecret }
        { name: 'azure-speech-key', value: azureSpeechKey }
      ]
    }
    template: {
      containers: [
        {
          name: 'server'
          image: serverImage
          resources: { cpu: json('0.5'), memory: '1Gi' }
          env: [
            // APP_ORIGIN contains "next": getDbConnectionData then takes MONGO_DB_URL as a complete connection string
            { name: 'APP_ORIGIN', value: appOrigin }
            { name: 'MONGO_DB_URL', value: 'mongodb://${mongoAppName}:${mongoPort}' }
            { name: 'MONGO_DB_NAME', value: 'zipcaptions' }
            { name: 'MONGO_DB_USER', value: mongoUser }
            { name: 'MONGO_DB_PASSWORD', secretRef: 'mongo-db-password' }
            { name: 'JWT_SECRET', secretRef: 'jwt-secret' }
            { name: 'SESSION_SECRET', secretRef: 'session-secret' }
            { name: 'GOOGLE_CLIENT_ID', secretRef: 'google-client-id' }
            { name: 'GOOGLE_CLIENT_SECRET', secretRef: 'google-client-secret' }
            { name: 'GOOGLE_REDIRECT_URI', value: '${apiOrigin}/v1/user/google-redirect' }
            { name: 'AZURE_CLIENT_ID', secretRef: 'azure-client-id' }
            { name: 'AZURE_CLIENT_SECRET', secretRef: 'azure-client-secret' }
            { name: 'AZURE_REDIRECT_URI', value: '${apiOrigin}/v1/user/azure-redirect' }
            { name: 'PATREON_CLIENT_ID', secretRef: 'patreon-client-id' }
            { name: 'PATREON_CLIENT_SECRET', secretRef: 'patreon-client-secret' }
            { name: 'PATREON_REDIRECT_URI', value: '${apiOrigin}/v1/user/patreon-redirect' }
            { name: 'PATREON_SUPPORTER_WEBHOOK_SECRET', secretRef: 'patreon-supporter-webhook-secret' }
            { name: 'PATREON_TOKEN_BALANCE_CAP', value: '180000' }
            { name: 'AZURE_SPEECH_KEY', secretRef: 'azure-speech-key' }
            { name: 'AZURE_SPEECH_REGION', value: azureSpeechRegion }
            { name: 'SOCKET_AUTH_MODE', value: socketAuthMode }
            { name: 'PEER_AUTH_MODE', value: peerAuthMode }
          ]
        }
      ]
      // One replica at most: the PeerJS realm and the socket registrations live in the server's memory.
      // Zero when idle, to cost nothing between test sessions.
      scale: {
        minReplicas: 0
        maxReplicas: 1
        rules: [
          { name: 'http', http: { metadata: { concurrentRequests: '50' } } }
        ]
      }
    }
  }
  dependsOn: [
    mongo
  ]
}

resource staticSite 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticSiteName
  location: swaLocation
  sku: { name: 'Free', tier: 'Free' }
  properties: {}
}

output staticSiteName string = staticSite.name
output staticSiteHostname string = staticSite.properties.defaultHostname
output serverAppName string = server.name
output serverHostname string = server.properties.configuration.ingress.fqdn
output environmentDefaultDomain string = environment.properties.defaultDomain
output domainVerificationId string = environment.properties.customDomainConfiguration.customDomainVerificationId
