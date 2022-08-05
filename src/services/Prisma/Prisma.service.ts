import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { injectKeys } from '../../types/injectKeys';
import { IChalkService } from '../Chalk';
import { ILoggerService } from '../Logger';
import { IPrismaService } from './Prisma.service.interface';

@injectable()
export class PrismaService implements IPrismaService {
	client: PrismaClient;
	constructor(
		@inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
		@inject(injectKeys.IChalkService) private chalkService: IChalkService,
	) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.info(
				this.chalkService.highlight('[PrismaService connection]'),
				'Connect to DB has been done',
			);
		} catch (error) {
			if (error instanceof Error) {
				this.loggerService.error(
					this.chalkService.highlight('[PrismaService connection]'),
					'Connection To DB has been failed',
					error.message,
				);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			this.client.$disconnect();
			this.loggerService.info(
				this.chalkService.highlight('[PrismaService disconnection]'),
				'Disconnect from DB has been failed',
			);
		} catch (error) {
			if (error instanceof Error) {
				this.loggerService.error(
					this.chalkService.highlight('[PrismaService disconnection]'),
					'Disconnection from DB has been failed',
					error.message,
				);
			}
		}
	}
}
