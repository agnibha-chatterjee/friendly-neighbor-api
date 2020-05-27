import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { registerNotification } from '../controllers/notificationController';

const notificationRouter = Router();

notificationRouter.route('/register').post(asyncHandler(registerNotification));

export default notificationRouter;
