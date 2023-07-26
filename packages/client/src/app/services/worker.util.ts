export const getWorker = (): Worker => {
  return new Worker(new URL('packages/client/src/app/modules/media/workers/recognition-history.worker', import.meta.url))
}