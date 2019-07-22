import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User extends Request {
  user: string;
}

export default function(req: User, res: Response, next: NextFunction) {
  // Get token from the header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }
  // verify token
  try {
    const decoded: any = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
