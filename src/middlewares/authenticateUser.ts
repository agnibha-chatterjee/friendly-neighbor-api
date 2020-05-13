import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/types';
import User from '../db/models/User';

interface RequestHeaders {
    _id: string;
}

const authenticateUser = async (
    req: CustomRequest<{}, RequestHeaders>,
    res: Response,
    next: NextFunction
) => {
    const { _id: userId } = req.headers;
    const user = await User.findById(userId);
    if (user) {
        next();
    } else {
        res.status(401).send({
            authenticated: false,
            error:
                'you need to be authenticated in order to access this endpoint',
        });
    }
};

export default authenticateUser;
