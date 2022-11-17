import {Express, NextFunction, Request, Response} from "express";
import {CompareHash, Hash} from "../crypto";
type Env = string | undefined;
const whiteList: Env[] = [process.env.IP_WHITELIST_1];
let acceptedWhitelist: string[] = [];

const Unauthorized = (res: Response) => {
    res.status(401).send('Unauthorized');
}

export const WhiteListMiddleware = (app: Express) => {
    app.set('trust proxy', true)
    app.use('*', Whitelist);
}

const Whitelist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ip: string | null = req.headers['x-forwarded-for'] as string ||
        req.socket.remoteAddress ||
        req.ip ||
        null;

    console.log('IP:', ip);
    
    if (ip !== null && acceptedWhitelist.indexOf(ip) !== -1 || IsWhitelisted(ip)) {
        next();
        return;
    }
    Unauthorized(res);
}

const IsWhitelisted = (ip: string | null): boolean => {
    if (ip === null) {
        return false;
    }

    whiteList.forEach((hash: Env) => {
        if (hash) {
            if (CompareHash(ip, hash)) {
                acceptedWhitelist.push(ip);
                return true;
            }
        }
    });

    return false;
}