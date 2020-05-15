import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    postUserCoordinates,
    registerUser,
} from '../controllers/userController';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
// userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));

export default userRouter;
