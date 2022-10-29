import { inject, injectable } from 'inversify';
import express, { Express, json } from 'express';
import { Server } from 'http';
import { injectKeys, ROUTES } from './app-constants';
import { ILoggerService, IChalkService, IConfigService, IPrismaService } from './services';
import cookieParser from 'cookie-parser';
import { IExceptionFilter } from 'errors';
import cors from 'cors';
import { IUserController } from 'controllers/user';
import { IUsersController } from 'controllers/users';

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
    @inject(injectKeys.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(injectKeys.IUserController) private userController: IUserController,
    @inject(injectKeys.IUsersController) private usersController: IUsersController,
  ) {
    this.app = express();
    this.port = this.config.get('PORT');
  }

  useMiddleWare(): void {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(this.exceptionFilter.catch);
  }

  useRoutes(): void {
    this.app.use(ROUTES.user.base, this.userController.router);
    this.app.use(this.usersController.router);
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
    this.useRoutes();

    this.startServer();
  }
}
