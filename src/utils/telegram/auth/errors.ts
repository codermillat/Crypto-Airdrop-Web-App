export class TelegramAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TelegramAuthError';
  }
}