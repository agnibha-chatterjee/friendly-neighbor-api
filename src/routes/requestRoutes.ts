import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    createRequest,
    getFilteredRequests,
    getRequestHistory,
    deleteRequest,
    addUserToRespondedBy,
} from '../controllers/requestController';
import { upload } from '../utils/multerConfig';
import authenticateUser from '../middlewares/authenticateUser';

const requestRouter = Router();

requestRouter
    .route('/:userId')
    .get(authenticateUser, asyncHandler(getFilteredRequests));
requestRouter
    .route('/history/:userId')
    .get(authenticateUser, asyncHandler(getRequestHistory));

requestRouter.route('/').post(
    authenticateUser,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ]),
    asyncHandler(createRequest)
);

requestRouter.route('/:requestId').delete(authenticateUser, deleteRequest);
requestRouter
    .route('/:requestId/respond/:userId')
    .get(authenticateUser, addUserToRespondedBy);

export default requestRouter;
