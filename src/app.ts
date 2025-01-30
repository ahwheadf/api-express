import express , { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	userConrtoller: UsersController;
	exeptionFilter: ExeptionFilter;

	constructor(logger: LoggerService, userController: UsersController, exeptionFilter: ExeptionFilter) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userConrtoller = userController;
		this.exeptionFilter = exeptionFilter;
	}

	useRoutes() {
		this.app.use('/users', this.userConrtoller.router);
	}

	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}

