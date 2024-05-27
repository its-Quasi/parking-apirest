import { Request, Response } from "express";
import { User } from "../models/user";
import { AppDataSource } from "../data-source";
import { generateToken } from "./jwt.service";
import { plainToInstance } from "class-transformer";
import { UserDto } from "../dto/userDto";
import bcrypt from 'bcrypt'
import { Role } from "../utils/role";
import { hashPassword } from "../utils/handlerPasswords";

const userRepository = AppDataSource.getRepository(User)
//const blacklistedTokens = new Set<string>();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    // check if emails exists
    const user = await userRepository.findOneBy({ email })
    if (!user) {
      return res.status(400).json({ message: 'bad request, email doesnt exists' })
    }
    // check password with bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userDto = plainToInstance(UserDto, user)
    const token = await generateToken({ ...userDto })
    return res.json({ user: { ...userDto }, token })
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
// Si puedes retroalimentarme en este logout lo agradeceria :D
export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ message: 'Login first' });
    }
    (req.user as any) = null
    return res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export const preloadAdmin = () => {
  const email = process.env.PRELOAD_EMAIL ?? ''
  const password = hashPassword(process.env.PRELOAD_PASSWORD ?? '')
  const admin: User = {
    email,
    password,
    role: Role.ADMIN,
    name: 'admin proof User',
    parkings: []
  }
  console.log(admin)
  userRepository.save(admin)
}