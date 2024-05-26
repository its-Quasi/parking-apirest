import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { UserDto } from '../dto/userDto'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()

  if (!token) return res.status(401).json({ message: 'Token Not Provided' })

  try {
    const payload = jwt.verify(token, 'secretKey') as UserDto & jwt.JwtPayload
    // exclude jwt props and add user props to req
    const { iat, exp, ...userInfo } = payload
    req.user = userInfo
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token Expired' });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid Token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}