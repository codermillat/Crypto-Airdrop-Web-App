export class WebAppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebAppError';
  }
}