import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from './db/connectDB';
import { initializeCloudinary } from './utils/cloudinaryConfig';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/userRoutes';
import requestRouter from './routes/requestRoutes';
import fs from 'fs';
import https from 'https';

const app = express();

connectDB();
initializeCloudinary();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/fn.twodee.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/fn.twodee.me/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/fn.twodee.me/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


if (process.env.NODE_ENV === 'development') {
    app.use(
        morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
        )
    );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const httpsServer = https.createServer(credentials, app);

const server = httpsServer.listen(PORT, () =>
    console.log(`Server is  running on port ${PORT}`)
);

process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
