import { Response, Request, NextFunction } from 'express';

export type ExpressHandler = (request: Request, response: Response, next: NextFunction) => void;
