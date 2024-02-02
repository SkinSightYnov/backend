import * as winston from 'winston';
import 'winston-daily-rotate-file';

// get the log level from env
const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // - Write to all logs with level `info` and below to 'logs/application-%DATE%.log', and errors to 'logs/error-%DATE%.log'.
    // - Write all logs error (and below) to 'logs/error-%DATE%.log'.
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'verbose',
    }),
    // if not in production then log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    ...(process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console({ format: winston.format.simple() })]
      : []),
  ],
});

export default logger;
