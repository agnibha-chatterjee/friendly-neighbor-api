import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createRequest } from '../controllers/requestController';
import { upload } from '../utils/multerConfig';

const requestRouter = Router();

requestRouter
    .route('/')
    .post(upload.array('images', 3), asyncHandler(createRequest));

export default requestRouter;
