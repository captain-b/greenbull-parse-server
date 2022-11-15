const server = require('parse-server').ParseServer;

export const ParseServer = new server({
    databaseURI: process.env.MONGODB_URI,
    // cloud: './cloud/main.js', // Path to your Cloud Code
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY, // Keep this key secret!
    serverURL: process.env.SERVER_URL
});