export interface WebkitSpeechRecognition {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
  abort: () => void;
  start: () => void;
  stop: () => void;
  addEventListener: (name: string, callback: (e: ) => void) => void;
}