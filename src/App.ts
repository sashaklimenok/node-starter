import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import { injectKeys } from './types/injectKeys';
import { ILoggerService } from './services';
import { IChalkService } from './services/Chalk';
import { IConfigService } from './services/Config';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: string;
	constructor(
		@inject(injectKeys.ILoggerService) private logger: ILoggerService,
		@inject(injectKeys.IChalkService) private chalk: IChalkService,
		@inject(injectKeys.IConfigService) private config: IConfigService,
	) {
		this.app = express();
		this.port = this.config.get('PORT');
	}

	init(): void {
		this.server = this.app.listen(this.port, () => {
			this.logger.info(
				`${this.chalk.highlight('The server has been running on')} http://localhost:${this.port}`,
			);
		});
	}
}
