import bcrypt from 'bcrypt'

export const hashPassword = (rawPassword: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}