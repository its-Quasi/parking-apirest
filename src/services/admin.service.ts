import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/user"
import { Parking } from "../models/parking"

const parkingRepository = AppDataSource.getRepository(Parking)
const userRepository = AppDataSource.getRepository(User)


/** CRUD OPERATIONS PARKING ENTITY **/

export const createParking = async (req: Request, res: Response) => {
  try {
    const parking = req.body
    parkingRepository.save(parking)
    res.status(200).send('park created')
  } catch (error) {

  }
}

export const getParkings = async (req: Request, res: Response) => {
  try {
    const parkings = await parkingRepository.find()
    res.status(200).send(parkings)
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}

export const getParkingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const parking = parkingRepository.findOneBy({ id })
    if (!parking) res.status(404).send({ message: `Parking with ID: ${id} not found` })
    else res.status(200).send(parking)
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}

// TODO : trycatch and proof both and all methods in this file

export const updateParking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const parkingToUpdate = await parkingRepository.findOneBy({ id })
  if (!parkingToUpdate) res.status(404).send('')
  parkingRepository.save(parkingToUpdate as Parking)
}

export const deleteParking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  parkingRepository.delete({ id })
}


/** OPERATIONS USER ENTITY **/