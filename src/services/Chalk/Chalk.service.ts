import chalk from 'chalk';
import { injectable } from 'inversify';
import { IChalkService } from './Chalk.service.interface';

@injectable()
export class ChalkService implements IChalkService {
	chalk: typeof chalk;

	constructor() {
		this.chalk = chalk;
	}

	highlight(value: string): string {
		return this.chalk.magenta(value);
	}
}
