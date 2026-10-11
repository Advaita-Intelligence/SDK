import { LogLevel } from '@acai/types';
import { getGlobalAcaiNamespace } from './misc';

// TODO: Type the global constant
const globalNamespace = getGlobalAcaiNamespace();

/** Prefix for logging strings */
const PREFIX = 'Acai Logger ';

/** JSDoc */
class Logger {
  /** JSDoc */
  private _logLevel: LogLevel;

  /** JSDoc */
  public constructor() {
    this._logLevel = 0;
  }

  /** JSDoc */
  public disable(): void {
    this._logLevel = 0;
  }

  /** JSDoc */
  public enable(logLevel: LogLevel = LogLevel.Warn): void {
    this._logLevel = logLevel;
  }

  /** JSDoc */
  public log(...args: any[]): void {
    if (this._logLevel < LogLevel.Verbose) {
      return;
    }
    global.console.log(`${PREFIX}[Log]: ${args.join(' ')}`); // tslint:disable-line:no-console
  }

  /** JSDoc */
  public warn(...args: any[]): void {
    if (this._logLevel < LogLevel.Warn) {
      return;
    }
    global.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`); // tslint:disable-line:no-console
  }

  /** JSDoc */
  public error(...args: any[]): void {
    if (this._logLevel < LogLevel.Error) {
      return;
    }
    global.console.error(`${PREFIX}[Error]: ${args.join(' ')}`); // tslint:disable-line:no-console
  }
}

// Ensure we only have a single logger instance, even if multiple versions of @acai/utils are being used
let logger: Logger = globalNamespace.logger as Logger;
if (logger === undefined) {
  logger = new Logger();
  globalNamespace.logger = logger;
}

export { logger };
