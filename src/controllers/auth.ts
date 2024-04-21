import { Request, Response, NextFunction } from "express";
import NotFoundException from "../exceptions/not-found";
import { RegisterSchema } from "../schema/user";

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    RegisterSchema.parse(req.body);
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    next(new NotFoundException("User not found"));
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};

export const login = (req: Request, res: Response) => {
  res.send("logging in");
};
