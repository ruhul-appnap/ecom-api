import { Router } from "express";
import { login } from "../controllers/auth";

const authRouter = Router();

authRouter.get("/login", login);

export default authRouter;
