import { Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { injectKeys } from '../../app-constants';
import { IChalkService, ILoggerService } from 'services';
import { IController, IRoute } from './controller.interface';

@injectable()
export abstract class Controller implements IController {
  private readonly _router: Router;
  constructor(
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IChalkService) private chalk: IChalkService,
  ) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  created(res: Response): Response {
    return res.sendStatus(201);
  }

  send<T>(res: Response, code: number, message: T): Response {
    return res.status(code).json(message);
  }

  ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  bindRoutes(routes: IRoute[]): void {
    routes.forEach(({ method, path, callback, middleware }) => {
      this.logger.info(this.chalk.highlight('Bind Route'), `[${method}] ${path}`);

      const bandedMiddleware = middleware?.map((callback) => callback.bind(this));
      const handler = callback.bind(this);
      const execution = bandedMiddleware ? [...bandedMiddleware, handler] : handler;

      this._router[method](path, execution);
    });
  }
}
