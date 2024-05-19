import { Response, Request, NextFunction, Router } from "express";

export type Controller = (req: Request, res: Response) => Promise<void>;

export const tryCatch = (controller: Controller) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res);
    } catch (error) {
        return next(error);
    }
};

export const wrapAsyncControllers = (router: Router) => {
    const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
    methods.forEach((method) => {
        const originalMethod = (router as any)[method];
        (router as any)[method] = (path: string, ...handlers: Controller[]) => {
            const wrappedHandlers = handlers.map(handler => tryCatch(handler));
            return originalMethod.call(router, path, ...wrappedHandlers);
        };
    });
};
