"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../lib/constant");
function configureGlobalErrorHandler(logger) {
    return function (error, req, res, next) {
        globalErrorHandler(error, req, res, next, logger);
    };
}
function globalErrorHandler(error, request, response, next, logger) {
    const status = error.status ? error.status : 500;
    const message = status === 500 ? constant_1.APP_ERROR_MESSAGE.serverError : error.message;
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
exports.default = configureGlobalErrorHandler;
