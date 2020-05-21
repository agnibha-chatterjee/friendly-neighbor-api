import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    postUserCoordinates,
    registerUser,
    getUserData,
    updateProfile,
} from '../controllers/userController';
import { upload } from '../utils/multerConfig';
import { client } from '../grpc/grpc-client';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter
    .route('/:userId')
    .get(getUserData)
    .put(upload.single('image'), asyncHandler(updateProfile));
// userRouter.route('/test').get(
//     asyncHandler(async (req, res) => {
//         const location = { latitude: 28.7, longitude: 77.1 };
//         const userId = '5Pi_uguOG';
//         const radius = 2;
//         client.saveUserLocation(
//             { userId, location, radius },
//             (err: any, data: any) => {
//                 if (err) throw err;
//                 res.json(data);
//             }
//         );
//     })
// );
// userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));

export default userRouter;
