import { inject, injectable } from 'inversify';
import express, { Express, json } from 'express';
import { Server } from 'http';
import { injectKeys } from './constants';
import { ILoggerService, IChalkService, IConfigService, IPrismaService } from './services';
import cookieParser from 'cookie-parser';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: string;
  constructor(
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IChalkService) private chalk: IChalkService,
    @inject(injectKeys.IConfigService) private config: IConfigService,
    @inject(injectKeys.IPrismaService) private prisma: IPrismaService,
  ) {
    this.app = express();
    this.port = this.config.get('PORT');
  }

  useMiddleWare(): void {
    this.app.use(json());
    this.app.use(cookieParser());
  }

  startServer(): void {
    this.server = this.app.listen(this.port, () => {
      this.logger.info(
        `${this.chalk.highlight('The server has been running on')} http://localhost:${this.port}`,
      );
    });
  }

  closeServer(): void {
    this.server.close();
  }

  async init(): Promise<void> {
    await this.prisma.connect();
    this.useMiddleWare();

    this.startServer();
  }
}
