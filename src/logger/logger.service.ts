import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		const loggerTemplate = 
		'{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}} ';

		this.logger = new Logger({
			prettyLogTemplate: loggerTemplate,
		});
	}

	public log(...args: unknown[]) {
		this.logger.info(...args);
	}
 
	public error(...args: unknown[]) {
		this.logger.error(...args);
	}

	public warn(...args: unknown[]) {
		this.logger.warn(...args);
	}


}