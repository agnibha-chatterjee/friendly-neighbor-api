import { Request, Response, NextFunction } from 'express';
declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authenticateUser;
