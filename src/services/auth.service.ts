import { Request, Response } from "express";
import { User } from "../models/user";
import { AppDataSource } from "../data-source";
import { generateToken } from "./jwt.service";

const userRepository = AppDataSource.getRepository(User)
interface LoginRequest extends Request {
  user: User
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    // check if emails exists
    const user = await userRepository.findOneBy({email})
    if(!user) {
      return res.status(400).json({
        message : 'bad request, email doesnt exists'
      })
    }
    // TODO: check password with bcrypt
    
    const token = await generateToken(user)
    return res.json({user, token})
  } catch (error) {

  }
}