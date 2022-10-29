import { Router } from 'express';
import { ExpressHandler } from 'types';

export interface IUsersController {
  router: Router;
  getUsers: ExpressHandler;
}
