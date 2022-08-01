import { ILogger } from './Logger.interface';
import { Logger } from 'tslog';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILogger {
	private logger: Logger;
	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warning(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
