"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { HttpException } from "./lib/exception/http";
const logger_1 = require("./lib/logger");
const express_1 = __importStar(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const try_handler_1 = require("./middleware/try.handler");
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middleware/error.handler"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const logger = (0, logger_1.createLogger)();
app.use((0, logger_1.requestLogger)(logger));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(helmet_1.default.xssFilter());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.frameguard({ action: 'deny' }));
app.use((0, compression_1.default)());
(0, try_handler_1.wrapAsyncControllers)(router);
router.use((0, cors_1.default)());
router.use("/api", routes_1.default);
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // throw new HttpException(404, "Testing global error handler");
    res.json({
        message: "Welcome to NTD (Node Typescript Docker) Implementation 😈"
    });
}));
router.use((0, error_handler_1.default)(logger));
app.use(router);
exports.default = app;
