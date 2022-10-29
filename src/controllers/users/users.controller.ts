import { injectKeys, ROUTES } from 'app-constants';
import { Controller } from 'base';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IChalkService, ILoggerService } from 'services';

@injectable()
export class UsersController extends Controller {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
  ) {
    super(logger, chalk);

    this.bindRoutes([
      {
        path: ROUTES.users.base,
        callback: this.getUsers,
        method: 'get',
      },
    ]);
  }

  getUsers(request: Request, response: Response, next: NextFunction): void {
    console.log(request.body);
  }
}
