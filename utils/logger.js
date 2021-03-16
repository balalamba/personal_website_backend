import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'backend-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

if (global.config.env !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger