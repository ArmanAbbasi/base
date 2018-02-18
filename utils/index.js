import path from 'path';
import config from '@config';

import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

export const logger = createLogger({
  'name': config.get('application.name'),
  'format': combine(
    timestamp(),
    printf(info =>
      `${ info.timestamp } [${ info.level.toUpperCase() }]: ${ info.message }\n ${ JSON.stringify(info) }`)
  ),
  'transports': [
    new transports.Console()
  ]
});

export const dynamic = (...args) => require(path.resolve(...args)).default;