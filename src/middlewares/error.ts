import { Request, Response, NextFunction } from "express";
import RootException from "../exceptions";

const errorMiddleware = (
  error: RootException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).json({
    message: error.message,
    error: error.error,
  });
};

export default errorMiddleware;
