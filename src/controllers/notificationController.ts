import { Response } from 'express';
import { CustomRequest } from '../types/types';

export const registerNotification = (
    req: CustomRequest<{ userId: string; token: String }, {}>,
    res: Response
) => {
    console.log(req.body);
    res.send({ hi: 'wassup my nigga' });
};
