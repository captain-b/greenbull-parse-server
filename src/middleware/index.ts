import {ParseServer} from "./parse_server";
import {Application} from "express";

export const ParseServerMiddleware = (app: Application) => {
    app.use('/greenbull', ParseServer);
}