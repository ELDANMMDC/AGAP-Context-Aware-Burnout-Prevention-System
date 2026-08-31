export {};

declare global {
  interface Window {
    agap: {
      ping: () => Promise<string>;
    };
  }
}