export class Logger {
  log(msg: string) {
    console.log(`${Date.now()} ${msg}`);
  }
}

const logger = new Logger();
logger.log('test');