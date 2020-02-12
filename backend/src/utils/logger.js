/* eslint-disable no-shadow */
const moment = require('moment');
const {
  addColors, createLogger, format, transports,
} = require('winston');

const {
  combine, colorize, printf, timestamp,
} = format;
const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  format: combine(
    timestamp({
      format: () => moment().format(),
    }),
    logFormat,
    colorize({ all: true }),
  ),
  transports: [new transports.Console({
    colorize: true,
  })],
});

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});


module.exports = logger;
