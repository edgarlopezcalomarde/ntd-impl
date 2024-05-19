"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message, error) {
        super(message);
        this.status = status;
        this.error = error;
    }
}
exports.HttpException = HttpException;
