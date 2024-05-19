import { APP_ERROR_MESSAGE } from "@lib/constant";
import { HttpException } from "@lib/exception/http";
import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";

function configureGlobalErrorHandler(logger: Logger) {
    return function (error: HttpException, req: Request, res: Response, next: NextFunction) {
        globalErrorHandler(error, req, res, next, logger);
    };
}

function globalErrorHandler(error: HttpException, request: Request, response: Response, next: NextFunction, logger?: Logger) {
    const status = error.status ? error.status : 500;
    const message = status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
    const errors = error.error;

    if (logger) {
        const dateTime = new Date().toISOString();
        const ipAddress = request.ip || request.connection.remoteAddress || '-';
        const method = request.method;
        const url = request.url;

        logger.error(`[${dateTime}] [${status}] [${ipAddress}] ${method} ${url} ms: ${error.message}`);
    }
    response.status(status).json({ status, message, error: errors });
}

export default configureGlobalErrorHandler;