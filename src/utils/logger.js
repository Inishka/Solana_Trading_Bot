const winston = require('winston');

const initializeLogger = (level) => {
  return winston.createLogger({
    level: level,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console()
    ],
  });
};

module.exports = {
  initializeLogger,
};
