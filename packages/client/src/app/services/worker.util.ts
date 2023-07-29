// Constructor split out to fix issue with Jest unit tests
// https://medium.com/razroo/import-meta-url-and-jest-e8bff359b7c4
export const getWorker = (): Worker => {
  return new Worker(new URL('packages/client/src/app/modules/media/workers/recognition-history.worker', import.meta.url))
}