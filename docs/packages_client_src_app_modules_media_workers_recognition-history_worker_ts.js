/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************************************************************!*\
  !*** ./packages/client/src/app/modules/media/workers/recognition-history.worker.ts ***!
  \*************************************************************************************/
/// <reference lib="webworker" />
class RecognitionHistoryWorker {
  constructor() {
    this.messageHistoryMap = new Map();
  }
  addToThread(threadId, message) {
    const messages = this.messageHistoryMap.get(threadId) || [];
    messages.push(message);
    this.messageHistoryMap.set(threadId, messages);
  }
  getMessagesFromThread(threadId) {
    return this.messageHistoryMap.get(threadId);
  }
}
const historyWorker = new RecognitionHistoryWorker();
addEventListener('message', ({
  data
}) => {
  try {
    switch (data.type) {
      case 'put':
        historyWorker.addToThread(data.id, data.message);
        postMessage({
          id: data.id,
          status: 'OK'
        });
        break;
      case 'get':
        postMessage({
          id: data.id,
          status: 'OK',
          messages: historyWorker.getMessagesFromThread(data.id)
        });
        break;
      default:
        postMessage({
          id: data.id,
          status: 'BAD REQUEST'
        });
        break;
    }
  } catch (e) {
    postMessage({
      id: data.id,
      status: 'FAILED',
      error: e.message
    });
  }
});
/******/ })()
;
//# sourceMappingURL=packages_client_src_app_modules_media_workers_recognition-history_worker_ts.js.map