import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './services';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(@inject(injectKeys.ILogger) private logger: ILogger) {
		this.app = express();
		this.port = 8000;
	}

	init(): void {
		this.server = this.app.listen(this.port, () => {
			this.logger.info(`The server has been running on http://localhost:${this.port}`);
		});
	}
}
