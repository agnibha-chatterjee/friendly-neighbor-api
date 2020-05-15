import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
    loginOrSignUp,
    postUserCoordinates,
    registerUser,
    updateProfilePhoto,
} from '../controllers/userController';
import { upload } from '../utils/multerConfig';
// import { client } from '../grpc/grpc-client';

const userRouter = Router();

userRouter.route('/login').post(asyncHandler(loginOrSignUp));
userRouter.route('/register').post(asyncHandler(registerUser));
userRouter
    .route('/:userId')
    .patch(upload.single('image'), asyncHandler(updateProfilePhoto));
// userRouter.route('/test').get(
//     asyncHandler(async (req, res) => {
//         const location = { latitude: 22, longitude: 88 };
//         const userId = '28uefre1';
//         const radius = 3;
//         client.registerUser(
//             { userId, location, radius },
//             (err: any, data: any) => {
//                 if (err) throw err;
//                 console.log(data);
//             }
//         );
//     })
// );
// userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));

export default userRouter;
