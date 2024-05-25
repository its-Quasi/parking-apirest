import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()

  if (!token) return res.status(401).json({ message: 'Token Not Provided' })

  try {
    const userInfo = jwt.verify(token, 'secretKey')
    // req.user = userInfo
    next()
  } catch (error) {
    res.status(500).json({ msg: 'all bad' })
  }
}