import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/user"
import { Parking } from "../models/parking"
import { plainToInstance } from "class-transformer"
import { ParkingDto } from "../dto/parkingDto"
import { QueryFailedError } from "typeorm"
import { hashPassword } from "../utils/handlerPasswords"
import { UserDto } from "../dto/userDto"



const parkingRepository = AppDataSource.getRepository(Parking)
const userRepository = AppDataSource.getRepository(User)


/** CRUD OPERATIONS PARKING ENTITY **/

export const createParking = async (req: Request, res: Response) => {
  try {
    const parking: Parking = req.body
    parking.avaliableSpaces = parking.totalSpaces
    const partnerEmail = parking.partner.email
    const partner = await userRepository.findOneBy({ email: partnerEmail })
    if (!partner) {
      return res.status(404).send({ message: `'Partner With Email ${partnerEmail} dont found` })
    }
    parkingRepository.save(parking)
    return res.status(200).send('park created')
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: "something went wrong" })
  }
}

export const getParkings = async (req: Request, res: Response) => {
  try {
    const parkings = await parkingRepository.find({
      where: { active: true },
      relations: ['partner']
    })
    const parkingDtos = plainToInstance(ParkingDto, parkings)
    res.status(200).send(parkingDtos)
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}

export const getParkingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const parking = await parkingRepository.findOne({
      where: { id },
      relations: ['partner']
    })
    if (!parking) res.status(404).send({ message: `Parking with ID: ${id} not found` })
    else {
      const parkingDto = plainToInstance(ParkingDto, parking)
      res.status(200).send(parkingDto)
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}

export const updateParking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const parkingData: Partial<Parking> = req.body;
    let parkingToUpdate = await parkingRepository.findOneBy({ id });

    if (!parkingToUpdate) {
      return res.status(404).send(`Parking with ID: ${id} not found`);
    }

    // Merge data and save
    parkingToUpdate = { ...parkingToUpdate, ...parkingData };
    await parkingRepository.save(parkingToUpdate);
    const upd = plainToInstance(ParkingDto, parkingToUpdate)
    res.status(200).send(upd);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }

}

export const deleteParking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const parking = await parkingRepository.findOneBy({ id });
    if (!parking) {
      return res.status(404).json({ message: 'Parking not found' });
    }
    // update 'active' field to false
    parking.active = false;
    await parkingRepository.save(parking);
    return res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error });
  }
}


/** OPERATIONS USER ENTITY **/

interface RequestUser extends Request {
  body: User
}

export const createPartner = async (req: RequestUser, res: Response) => {
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

export const getPartners = async (req: RequestUser, res: Response) => {
  try {
    const users = await userRepository.find({ relations: ['parkings'] })
    const usersDtos = plainToInstance(UserDto, users)
    res.status(200).send(usersDtos)
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}
