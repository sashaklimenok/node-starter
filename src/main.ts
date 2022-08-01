import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './App';
import { ILogger, LoggerService } from './services';
import { injectKeys } from './types/injectKeys';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(injectKeys.Application).to(App);
	bind<ILogger>(injectKeys.ILogger).to(LoggerService);
});

const bootstrap = () => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(injectKeys.Application);
	app.init();
	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
