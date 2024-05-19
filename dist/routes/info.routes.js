"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../lib/exception/http");
const express_1 = require("express");
const os_1 = __importDefault(require("os"));
const router = (0, express_1.Router)();
router.get('/cpu', (req, res) => {
    throw new http_1.HttpException(300, "Testing global error handler");
    const cpus = os_1.default.cpus();
    res.json(cpus);
});
router.get('/memory', (req, res) => {
    const totalMemory = os_1.default.totalmem();
    const freeMemory = os_1.default.freemem();
    res.json({ totalMemory, freeMemory });
});
router.get('/os', (req, res) => {
    const platform = os_1.default.platform();
    const release = os_1.default.release();
    const uptime = os_1.default.uptime();
    res.json({ platform, release, uptime });
});
router.get('/network', (req, res) => {
    const networkInterfaces = os_1.default.networkInterfaces();
    res.json(networkInterfaces);
});
exports.default = router;
