import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const generateToken = (data: {}) => {
  const token = jwt.sign(data, JWT_SECRET);

  return token;
};
