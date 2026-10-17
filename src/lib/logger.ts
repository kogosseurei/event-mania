export const logger = {
  error(message: string, error?: unknown): void {
    console.error(message, error instanceof Error ? error.message : '');
  },
  info(message: string): void {
    console.info(message);
  },
};
