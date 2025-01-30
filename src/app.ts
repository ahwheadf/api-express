import express , { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	userConrtoller: UsersController;

	constructor(logger: LoggerService, userController: UsersController) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userConrtoller = userController;
	}

	useRoutes() {
		this.app.use('/users', this.userConrtoller.router);
	}

	public async init() {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}

