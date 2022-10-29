import { Router } from 'express';
import { ExpressHandler } from 'types';

export interface IRoute {
  path: string;
  callback: ExpressHandler;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middleware?: ExpressHandler[];
}

export interface IController {
  bindRoutes(routes: IRoute[]): void;
}
