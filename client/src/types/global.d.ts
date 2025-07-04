export {};

declare global {
  interface Window {
    updateMessageCount?: (valueOrUpdater: number | ((prev: number) => number)) => void;
  }
}
