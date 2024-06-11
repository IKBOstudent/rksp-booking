import { NextFunction, Request, Response } from 'express';

export const logMiddleware = (
    req: Request,
    _: Response,
    next: NextFunction,
) => {
    console.log(
        `[${new Date().toISOString()}]  :  ${req.method} ${decodeURI(req.url)} from: ${req.headers.host} params=${JSON.stringify(req.params)} body=${JSON.stringify(req.body)}`,
    );

    next();
};
