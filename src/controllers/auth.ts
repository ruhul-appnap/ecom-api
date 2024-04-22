import { Request, Response, NextFunction } from "express";
import NotFoundException from "../exceptions/not-found";
import { RegisterSchema } from "../schema/user";
import UnProcessableEntity from "../exceptions/validation";
import { formatError } from "../utils/error-formater";
import prisma from "../lib/db";
import { hashPassword } from "../lib/bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    RegisterSchema.parse(req.body);

    const { name, email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      return next(new NotFoundException("User already exists"));
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
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
