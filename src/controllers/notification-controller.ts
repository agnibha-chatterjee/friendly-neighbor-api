import { Response, Request } from 'express';
import { client } from '../grpc/grpc-client';

export const registerNotification = (req: Request, res: Response) => {
  const { token, userId } = req.body;
  client.saveUserForNotifications(
    { userId, notifyToken: token },
    (err: string, data: { success: true }) => {
      if (err) console.log(`Error - ${err}`);
      if (data.success) console.log(`Now sending notifications to ${userId}`);
    }
  );
};
