import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';

import { NODE_ENV } from './utilities';
import routes from './routes/v1.route';

// INITIALIZE
const app = express();
let httpServer;
if (NODE_ENV === 'development') httpServer = http.Server(app);
else {
    const httpsOptions = {
        key: fs.readFileSync('/etc/apache2/ssl/vdogt/vdogt.key'),
        cert: fs.readFileSync('/etc/apache2/ssl/vdogt/d22fee7d128a72d7.crt'),
        ca: fs.readFileSync('/etc/apache2/ssl/vdogt/gd_bundle-g2-g1.crt')
    };
    httpServer = https.createServer(httpsOptions, app);
}
const io = new Server(httpServer);

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1/', routes);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL VARIABLES
app.locals.io = io;

export default httpServer;
