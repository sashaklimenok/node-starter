export interface ILoggerService {
  info(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warning(...args: unknown[]): void;
}
