import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/user';

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
