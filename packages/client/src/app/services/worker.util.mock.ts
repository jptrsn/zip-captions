export const getWorker = () => {
  if (typeof Worker !== 'undefined') {
    return new Worker(new URL('packages/client/src/app/modules/media/workers/recognition-history.worker', ''))
  } else {
    return {
      addEventListener: () => null
    };
  }
}