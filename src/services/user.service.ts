import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/user"
import { QueryFailedError } from "typeorm"
import { hashPassword } from "../utils/handlerPasswords"
import { plainToInstance } from 'class-transformer';
import { UserDto } from "../dto/userDto"

const userRepository = AppDataSource.getRepository(User)

interface RequestUser extends Request {
  body: User
}

export const createUser = async (req: RequestUser, res: Response) => {
  const newUser = req.body
  try {
    newUser.password = hashPassword(newUser.password)
    await userRepository.insert(newUser)
    res.status(201).send('User Created Successfully')
  } catch (error) {
    const queryError = error as any
    if (error instanceof QueryFailedError && queryError.code === '23505') {
      res.status(409).send({ message: 'User Alredy Exists', error: queryError.detail })
    } else {
      res.status(500).send({ message: 'Internal Server Error', error })
    }
  }
}

export const getUsers = async (req: RequestUser, res: Response) => {
  try {
    const users = await userRepository.find({ relations: ['parkings'] })
    const usersDtos = plainToInstance(UserDto, users)
    res.status(200).send(usersDtos)
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}
