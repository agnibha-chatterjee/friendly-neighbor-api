import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  loginOrSignUp,
  registerUser,
  getUserData,
  updateProfile,
  signUserOut,
} from '../controllers/user-controller';
import { upload } from '../utils/multer-config';
import authenticateUser from '../middlewares/authenticate-user';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter.post('/logout', asyncHandler(signUserOut));
userRouter
  .route('/:userId')
  .get(authenticateUser, getUserData)
  .put(authenticateUser, upload.single('image'), asyncHandler(updateProfile));

export { userRouter };
