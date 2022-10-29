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
import { injectKeys } from './app-constants';
import { ExceptionFilter, IExceptionFilter } from 'errors';
import { IUserController, UserController } from 'controllers/user';
import { IUsersController, UsersController } from 'controllers/users';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService).inSingletonScope();
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService).inSingletonScope();
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService).inSingletonScope();
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService).inSingletonScope();
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IUserController>(injectKeys.IUserController).to(UserController).inSingletonScope();
  bind<IUsersController>(injectKeys.IUsersController).to(UsersController).inSingletonScope();
});

const bootstrap = (): Record<string, unknown> => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(injectKeys.Application);
  app.init();
  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
