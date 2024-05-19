import express from 'express';
import morgan from 'morgan';
import winston, { Logger as WinstonLoggerType } from 'winston';

enum Levels {
    DEBUG = 'debug',
    ERROR = 'error',
    INFO = 'info'
}

function createLogger(): WinstonLoggerType {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.prettyPrint(),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.colorize(),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
            new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
            new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
        ]
    });
}

function debug(logger: WinstonLoggerType, message: string) {
    logger.debug(message);
}

function error(logger: WinstonLoggerType, message: string | Error) {
    logger.error(message);
}

function info(logger: WinstonLoggerType, message: string) {
    logger.info(message);
}

function requestLogger(logger: WinstonLoggerType): express.RequestHandler {
    return morgan((tokens, req, res) => {
        const dateTime = new Date().toISOString();
        const ipAddress = req.ip || req.connection.remoteAddress || '-';
        const method = tokens.method(req, res);
        const url = tokens.url(req, res);
        const status = tokens.status(req, res);
        const responseTime = tokens['response-time'](req, res);
        const message = `[${dateTime}] [${status}] [${ipAddress}] ${method} ${url} - ${responseTime}ms`;
        return message;
    }, {
        stream: {
            write: (message: string) => {
                info(logger, message.trim());
            }
        }
    });
}


export { createLogger, debug, error, info, requestLogger };
