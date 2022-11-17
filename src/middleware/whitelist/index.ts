import {Express, Request, Response} from "express";

export const WhiteListMiddleware = (app: Express) => {
    app.get('*', Whitelist)
}

const Whitelist = (req: Request, res: Response): void => {
    const ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    console.log(ip)
    console.log(req.hostname)
}