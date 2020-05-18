import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/types';
import User from '../db/models/User';

const authenticateUser = async (
    req: Request,
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
            error: 'this is a protected route',
        });
    }
};

export default authenticateUser;
