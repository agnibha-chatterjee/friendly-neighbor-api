import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    postUserCoordinates,
    registerUser,
    updateProfilePhoto,
} from '../controllers/userController';
import { upload } from '../utils/multerConfig';
import { client } from '../grpc/grpc-client';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter
    .route('/:userId')
    .patch(upload.single('image'), asyncHandler(updateProfilePhoto));
userRouter.route('/test').get(
    asyncHandler(async (req, res) => {
        const location = { latitude: 28.7, longitude: 77.1 };
        const userId = 'Rbs0iLel6';
        const radius = 3;
        client.saveUserLocation(
            { userId, location, radius },
            (err: any, data: any) => {
                if (err) throw err;
                console.log(data);
                res.json(data);
            }
        );
    })
);
// userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));

export default userRouter;
