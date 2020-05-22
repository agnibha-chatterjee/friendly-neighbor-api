import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    registerUser,
    getUserData,
    updateProfile,
} from '../controllers/userController';
import { upload } from '../utils/multerConfig';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter
    .route('/:userId')
    .get(getUserData)
    .put(upload.single('image'), asyncHandler(updateProfile));

export default userRouter;
