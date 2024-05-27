import { NextFunction, Request, Response } from "express";
import { Role } from "../utils/role";

export const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' })
  } 
  if (user.role !== Role.ADMIN) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  next()
}