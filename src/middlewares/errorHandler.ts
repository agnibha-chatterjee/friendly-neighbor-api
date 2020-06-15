import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Error : ${err.message}`);
  res.status(500).send({
    error: err.message,
  });
};

export default errorHandler;
