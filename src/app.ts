import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import fs from 'fs';
import https from 'https';
import connectDB from './db/connect-db';
import { initializeCloudinary } from './utils/cloudinary-config';
import { errorHandler } from './middlewares/error-handler';
import { userRouter } from './routes/user-routes';
import { requestRouter } from './routes/request-routes';
import { notificationRouter } from './routes/notification-router';
// import http from 'http';
import { NotFoundError } from './errors/not-found-error';

const app = express();

connectDB();
initializeCloudinary();

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/fn.twodee.me/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/fn.twodee.me/cert.pem',
  'utf8'
);
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/fn.twodee.me/chain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/requests', requestRouter);
app.use('/api/notifications', notificationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// Error middleware

const PORT = process.env.PORT || 5000;
const httpsServer = https.createServer(credentials, app);

const server = httpsServer.listen(PORT, () =>
  console.log(`Server is  running on port ${PORT}`)
);

process.on('unhandledRejection', (err: any, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
