import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3).max(25),
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
});
