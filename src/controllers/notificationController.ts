import { Response } from 'express';
import { CustomRequest } from '../types/types';
import { client } from '../grpc/grpc-client';

export const registerNotification = (
    req: CustomRequest<{ userId: string; token: String }, {}>,
    res: Response
) => {
    const { token, userId } = req.body;
    client.saveUserForNotifications(
        { userId, notifyToken: token },
        (err: string, data: { success: true }) => {
            if (err) console.log(`Error - ${err}`);
            if (data.success)
                console.log(`Now sending notifications to ${userId}`);
        }
    );
};
