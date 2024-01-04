import { AppError } from './app-error';

export class ServerError extends AppError {
  getErrorMessage(): string {
    return 'Server Error. Please try again later.';
  }
}
