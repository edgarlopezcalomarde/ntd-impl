"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = exports.info = exports.error = exports.debug = exports.createLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("winston"));
var Levels;
(function (Levels) {
    Levels["DEBUG"] = "debug";
    Levels["ERROR"] = "error";
    Levels["INFO"] = "info";
})(Levels || (Levels = {}));
function createLogger() {
    return winston_1.default.createLogger({
        format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
        transports: [
            new winston_1.default.transports.Console(),
            new winston_1.default.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
            new winston_1.default.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
            new winston_1.default.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
        ]
    });
}
exports.createLogger = createLogger;
function debug(logger, message) {
    logger.debug(message);
}
exports.debug = debug;
function error(logger, message) {
    logger.error(message);
}
exports.error = error;
function info(logger, message) {
    logger.info(message);
}
exports.info = info;
function requestLogger(logger) {
    return (0, morgan_1.default)((tokens, req, res) => {
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
            write: (message) => {
                info(logger, message.trim());
            }
        }
    });
}
exports.requestLogger = requestLogger;
