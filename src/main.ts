import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './App';
import { ILoggerService, LoggerService } from './services';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/Config';
import { ChalkService, IChalkService } from './services/Chalk';
import { IPrismaService, PrismaService } from './services/Prisma';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(injectKeys.Application).to(App);
	bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(injectKeys.IConfigService).to(ConfigService).inSingletonScope();
	bind<IChalkService>(injectKeys.IChalkService).to(ChalkService).inSingletonScope();
	bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService).inSingletonScope();
});

const bootstrap = (): Record<string, unknown> => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(injectKeys.Application);
	app.init();
	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
