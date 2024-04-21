import { Router } from "express";
import { login, register } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.get("/login", login);

export default authRouter;
