/// <reference lib="webworker" />

interface HistoryRequest {
  type: 'put' | 'get';
  id: string;
  message?: string;
}

class RecognitionHistoryWorker {
  private messageHistoryMap: Map<string, string[]> = new Map();

  public addToThread(threadId: string, message: string): void {
    const messages: string[] = this.messageHistoryMap.get(threadId) || [];
    messages.push(message);
    this.messageHistoryMap.set(threadId, messages)
  }

  public getMessagesFromThread(threadId: string): string[] | undefined {
    return this.messageHistoryMap.get(threadId);
  }
}

const historyWorker = new RecognitionHistoryWorker();

addEventListener('message', ({ data }: {data: HistoryRequest}) => {
  try {
    switch (data.type) {
      case 'put': 
        historyWorker.addToThread(data.id, data.message as string);
        postMessage({id: data.id, status: 'OK'})
        break;
      case 'get':
        postMessage({id: data.id, status: 'OK', messages: historyWorker.getMessagesFromThread(data.id)});
        break;
      default:
        postMessage({id: data.id, status: 'BAD REQUEST'});
        break;
    }
  } catch(e: any) {
    postMessage({id: data.id, status: 'FAILED', error: e.message});
  }
});