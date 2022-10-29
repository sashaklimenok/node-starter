import { Controller } from 'base';
import { injectKeys, ROUTES } from 'app-constants';
import { inject, injectable } from 'inversify';
import { IChalkService, ILoggerService } from 'services';
import { NextFunction, Response, Request } from 'express';
import { IUserController } from './user.controller.interface';

@injectable()
export class UserController extends Controller implements IUserController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
  ) {
    super(logger, chalk);

    this.bindRoutes([
      {
        path: ROUTES.user.login,
        callback: this.login,
        method: 'post',
      },
      {
        path: ROUTES.user.register,
        callback: this.register,
        method: 'post',
      },
    ]);
  }

  register(request: Request, response: Response, next: NextFunction): void {
    console.log(request.body);
  }

  login(request: Request, response: Response, next: NextFunction): void {
    console.log(request.body);
  }
}
