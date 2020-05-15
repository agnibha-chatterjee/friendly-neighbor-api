import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import connectDB from './db/connectDB';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/userRoutes';
import { initializeCloudinary } from './utils/cloudinaryConfig';

const app = express();

connectDB();
initializeCloudinary();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`Server is  running on port ${PORT}`)
);

process.on('unhandledRejection', (err: any, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1));
});
