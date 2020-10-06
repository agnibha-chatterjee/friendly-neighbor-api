import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createRequest,
  getFilteredRequests,
  getRequestHistory,
  deleteRequest,
  addUserToRespondedBy,
  acceptUserThatResponded,
  removeUserThatResponded,
} from '../controllers/request-controller';
import { upload } from '../utils/multer-config';
import authenticateUser from '../middlewares/authenticate-user';

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
  .get(authenticateUser, addUserToRespondedBy)
  .patch(authenticateUser, acceptUserThatResponded)
  .delete(authenticateUser, removeUserThatResponded);

export { requestRouter };
