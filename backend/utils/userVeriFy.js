import Jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

export const veriFyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(ErrorHandler(401, "UnAuthorised"));
  Jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) return next(ErrorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
