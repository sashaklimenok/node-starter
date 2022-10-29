import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { injectKeys } from 'app-constants';
import { IChalkService, ILoggerService } from '../services';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-errors';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IChalkService) private chalk: IChalkService,
  ) {
    this.catch = this.catch.bind(this);
  }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(
        `${this.chalk.highlight(`[${err.context}]`)} Error ${err.statusCode}: ${err.message}`,
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
