import { NextFunction, Request, Response } from "express";
import { Role } from "../utils/role";

export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  if (!user) {
    res.status(401).send({ message: 'Unauthorized' })
  } 
  if (user.role !== Role.ADMIN) {
    res.status(401).send({ message: 'Unauthorized' })
  }
  next()
}