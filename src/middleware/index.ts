import {ParseServer} from "./parse_server";
import {Express} from "express";

export const ParseServerMiddleware = (app: Express) => {
    app.use('/greenbull', ParseServer);
}