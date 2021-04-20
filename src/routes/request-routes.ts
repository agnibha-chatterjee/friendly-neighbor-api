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
  fetchOngoingTransactions,
  completeRequest,
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
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
  ]),
  asyncHandler(createRequest)
);

requestRouter
  .route('/:requestId')
  .post(authenticateUser, asyncHandler(completeRequest))
  .delete(authenticateUser, deleteRequest);

requestRouter
  .route('/:requestId/respond/:userId')
  .get(authenticateUser, addUserToRespondedBy)
  .patch(acceptUserThatResponded)
  .delete(authenticateUser, removeUserThatResponded);

requestRouter
  .route('/ongoing/:userId')
  .get(authenticateUser, asyncHandler(fetchOngoingTransactions));

export { requestRouter };
