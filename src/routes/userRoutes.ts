import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    postUserCoordinates,
} from '../controllers/userController';

const userRouter = Router();

userRouter.post('/login', asyncHandler(loginOrSignUp));
userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));

export default userRouter;
