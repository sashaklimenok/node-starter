export const injectKeys = {
  //Services
  Application: Symbol.for('Application'),
  ILoggerService: Symbol.for('ILoggerService'),
  IConfigService: Symbol.for('IConfigService'),
  IChalkService: Symbol.for('IChalkService'),
  IPrismaService: Symbol.for('IPrismaService'),
  IExceptionFilter: Symbol.for('IExceptionFilter'),

  //Controllers
  IUserController: Symbol.for('IUserController'),
  IUsersController: Symbol.for('IUsersController'),
};
