import { Router } from 'express';
import { ExpressHandler } from 'types';

export interface IUserController {
  router: Router;
  login: ExpressHandler;
  register: ExpressHandler;
}
