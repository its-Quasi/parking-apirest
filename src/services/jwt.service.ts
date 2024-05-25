import jwt from 'jsonwebtoken'
import { UserDto } from '../dto/userDto'


export const generateToken = (payload: UserDto) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(payload, 'secretKey', { expiresIn: '6h' }, (err, token) => {
      if (err) reject('Cant generate token')
      else {
        resolve(token)
      }
    })
  })
}