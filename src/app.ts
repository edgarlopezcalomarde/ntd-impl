// import { HttpException } from "@lib/exception/http";
import { createLogger, requestLogger } from "@lib/logger";
import express, { Application, NextFunction, Request, Response, Router } from "express"
import helmet from "helmet";
import compress from 'compression';
import cors from "cors";
import cookieParser from "cookie-parser";

import { wrapAsyncControllers } from "./middleware/try.handler";
import routes from "./routes";
import configureGlobalErrorHandler from "./middleware/error.handler";

const app: Application = express();
const router: Router = Router();
const logger = createLogger();


app.use(requestLogger(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

wrapAsyncControllers(router)


router.use(cors());
router.use("/api", routes)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    // throw new HttpException(404, "Testing global error handler");
    res.json({
        message: "Welcome to NTD (Node Typescript Docker) Implementation 😈"
    })

})

router.use(configureGlobalErrorHandler(logger));
app.use(router)

export default app;