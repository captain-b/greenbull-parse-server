import {SetEnvVars} from "./utils/dotenv";
SetEnvVars();

import {ParseServerMiddleware} from "./middleware";
import {Server} from "./middleware/express";
import {ParseDashboardMiddleware} from "./middleware/parse_dashboard";
import * as https from "https";
import * as fs from "fs";
import path from "path";

ParseServerMiddleware(Server);
if (process.env.NODE_ENV === 'local-dev') {
    ParseDashboardMiddleware(Server);
}

const startHttps = () => {
    https.createServer({
        key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY!)),
        cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT!))
    }, Server).listen(1338, () => {
        console.log('Running on HTTPS');
    });
}

const startHttp = () => {
    Server.listen(1337, () => {
        console.log('Running on HTTP');
    });
}


if (process.env.SSL_KEY && process.env.SSL_CERT) {
    startHttps();
} else {
    startHttp();
}