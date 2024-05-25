import jwt from 'jsonwebtoken'


export const generateToken = (email: string) => {
  const payload = {email}
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(payload, 'secretKey', { expiresIn: '6h' }, (err, token) => {
      if (err) reject('Cant generate token')
      else {
        resolve(token)
      }
    })
  })
}