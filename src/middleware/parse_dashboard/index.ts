import {Express} from "express";
import path from "path";

const ParseDashboard = require('parse-dashboard');

export const ParseDashboardMiddleware = (app: Express) => {
    const dashboard = new ParseDashboard({
        apps: [
            {
                appName: process.env.APP_NAME,
                appId: process.env.APP_ID,
                masterKey: process.env.MASTER_KEY,
                serverURL: process.env.SERVER_URL,
                iconName: 'favicon.png'
            }
        ],
        users: [
            {
                user: process.env.PARSE_DASHBOARD_USERNAME,
                pass: process.env.PARSE_DASHBOARD_PASS
            }
        ],
        useEncryptedPasswords: false,
        iconsFolder: path.join(__dirname, '../assets/img')
    });

    app.use('/dashboard', dashboard);
}