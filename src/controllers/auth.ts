import { Request, Response, NextFunction } from "express";
import NotFoundException from "../exceptions/not-found";
import { RegisterSchema } from "../schema/user";
import UnProcessableEntity from "../exceptions/validation";
import { formatError } from "../utils/error-formater";

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    RegisterSchema.parse(req.body);

    const { name, email, password } = req.body;
    console.log({ name, email, password });

    next(new NotFoundException("User not found"));
  } catch (error: any) {
    next(
      new UnProcessableEntity(
        "Invalid request body",
        formatError(error?.issues)
      )
    );
  }
};

export const login = (req: Request, res: Response) => {
  res.send("logging in");
};
