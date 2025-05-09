"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const defaultServer = require("./default-server");
const https = require("https");
const fs = require("fs");
defaultServer.start(function (err, app) {
    if (err) {
        throw err;
    }
    const httpsEnabled = Boolean(process.env.HTTPS) || false;
    const defaultPort = httpsEnabled ? 8443 : 3000;
    // const port: number = Number(process.env.API_PORT) || Number(process.env.PORT) || defaultPort;
    const port = process.env.API_PORT || process.env.PORT || defaultPort;
    let server;
    if (httpsEnabled) {
        const options = {
            key: fs.readFileSync("./certs/cert.key", "utf8"),
            cert: fs.readFileSync("./certs/cert.crt", "utf8"),
        };
        server = https.createServer(options, app).listen(port, function () {
            console.log("API host listening at https://localhost:" + port);
        });
    }
    else {
        server = app.listen(port, function () {
            console.log("API host listening at http://localhost:" + port);
        });
    }
    server.setTimeout(0);
});
