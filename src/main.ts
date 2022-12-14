import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './App';
import {
  ILoggerService,
  LoggerService,
  ConfigService,
  IConfigService,
  ChalkService,
  IChalkService,
  IPrismaService,
  PrismaService,
} from 'services';
import { injectKeys } from './constants';
import { ExceptionFilter, IExceptionFilter } from 'errors';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService).inSingletonScope();
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService).inSingletonScope();
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService).inSingletonScope();
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService).inSingletonScope();
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
});

const bootstrap = (): Record<string, unknown> => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(injectKeys.Application);
  app.init();
  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
