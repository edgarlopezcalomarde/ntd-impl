"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./lib/config");
const app_1 = __importDefault(require("./app"));
try {
    app_1.default.listen(config_1.PORT, () => {
        console.log(`Server running at http://localhost:${config_1.PORT}`);
    });
}
catch (err) {
    console.log(err);
    process.exit(1);
}
process.on("uncaughtException", (e) => {
    console.log(e);
    process.exit(0);
});
