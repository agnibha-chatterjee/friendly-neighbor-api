import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  loginOrSignUp,
  registerUser,
  getUserData,
  updateProfile,
  signUserOut,
  getKarmaPointsData,
} from '../controllers/user-controller';
import { upload } from '../utils/multer-config';
import authenticateUser from '../middlewares/authenticate-user';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter.post('/logout', asyncHandler(signUserOut));
userRouter
  .route('/:userId')
  .get(getUserData)
  .put(upload.single('image'), asyncHandler(updateProfile));

userRouter.route('/karma/:userId').get(asyncHandler(getKarmaPointsData));

export { userRouter };
