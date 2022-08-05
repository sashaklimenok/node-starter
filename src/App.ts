import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import { injectKeys } from './types/injectKeys';
import { ILoggerService } from './services';
import { IChalkService } from './services/Chalk';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(injectKeys.ILoggerService) private logger: ILoggerService,
		@inject(injectKeys.IChalkService) private chalk: IChalkService,
	) {
		this.app = express();
		this.port = 8000;
	}

	init(): void {
		this.server = this.app.listen(this.port, () => {
			this.logger.info(
				`${this.chalk.highlight('The server has been running on')} http://localhost:${this.port}`,
			);
		});
	}
}
