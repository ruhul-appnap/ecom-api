import { Request, Response, NextFunction } from "express";
import NotFoundException from "../exceptions/not-found";
import { LoginSchema, RegisterSchema } from "../schema/user";
import UnProcessableEntity from "../exceptions/validation";
import { formatError } from "../utils/error-formater";
import prisma from "../lib/db";
import { comparePassword, hashPassword } from "../lib/bcrypt";

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    LoginSchema.parse(req.body);

    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return next(new NotFoundException("User does not exists"));
    }

    if (!(await comparePassword(password, user.password)))
      return next(new NotFoundException("Password is not valid"));

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
