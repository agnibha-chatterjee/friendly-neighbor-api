import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { createRequest } from '../controllers/requestController';
import { upload } from '../utils/multerConfig';

const requestRouter = Router();

requestRouter.route('/').post(
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ]),
    asyncHandler(createRequest)
);

export default requestRouter;
