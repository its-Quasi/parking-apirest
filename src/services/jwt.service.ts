import jwt from 'jsonwebtoken'

export const generateToken = (payload: object) => {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign(payload, 'secretKey', { expiresIn: '6h' }, (err, token) => {
      if (err) {
        console.log(err.message) //Change by a logger
        reject(err.message)
      }
      else resolve(token)
    })
  })
}