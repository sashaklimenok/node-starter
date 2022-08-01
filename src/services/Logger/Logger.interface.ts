export interface ILogger {
	info(...args: unknown[]): void;
	error(...args: unknown[]): void;
	warning(...args: unknown[]): void;
}
