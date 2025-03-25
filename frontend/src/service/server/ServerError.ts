/**
 * Custom error class for server-related errors.
 */
export class ServerError extends Error {
  status: number;
  statusText: string;
  data: any;
  url?: string;

  constructor(status: number, statusText: string, data: any, url?: string) {
    const errorMessage = data?.message || statusText || 'Server Error';
    const fullMessage = `Server Error (${status}): ${errorMessage}${url ? ` - ${url}` : ''}`;

    super(fullMessage);

    this.name = 'ServerError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.url = url;

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }

  /**
   * Returns a string representation of the error for logging.
   */
  toString(): string {
    return `ServerError [${this.status}]: ${this.message}`;
  }
}
