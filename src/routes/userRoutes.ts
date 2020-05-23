import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    registerUser,
    getUserData,
    updateProfile,
} from '../controllers/userController';
import { upload } from '../utils/multerConfig';
import authenticateUser from '../middlewares/authenticateUser';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter
    .route('/register')
    .post(authenticateUser, asyncHandler(registerUser));
userRouter
    .route('/:userId')
    .get(authenticateUser, getUserData)
    .put(authenticateUser, upload.single('image'), asyncHandler(updateProfile));

export default userRouter;
