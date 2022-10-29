import { ExpressHandler } from './express-handlers';

export interface IMiddleware {
	handle: ExpressHandler;
}
