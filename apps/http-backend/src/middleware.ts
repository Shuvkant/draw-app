import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] ?? ""
  //@ts-ignore
  const decoded = jwt.verify(token, JWT_SECRET)
  try {
    if (decoded) {
      //@ts-ignore
      req.userId = decoded.userId
      next()

    }

  } catch (error) {

    return res.status(403).json({
      msg: "Invalid credentidals"
    })
  }

} 
