import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class UserController extends BaseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger
	) {
		super(loggerService); 
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register},
			{ path: '/login', method: 'post', func: this.login }
		])
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'reqister');
	}

	login(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'login');
	}
}