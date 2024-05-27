import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/user"
import { Parking } from "../models/parking"
import { plainToInstance } from "class-transformer"
import { ParkingDto } from "../dto/parkingDto"

const parkingRepository = AppDataSource.getRepository(Parking)
const userRepository = AppDataSource.getRepository(User)


/** CRUD OPERATIONS PARKING ENTITY **/

export const createParking = async (req: Request, res: Response) => {
  try {
    const parking: Parking = req.body
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
      relations: ['partner'],
      // select : {partner : {}}
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
    const id = parseInt(req.params.id)
    await parkingRepository.delete({ id })
    return res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}


/** OPERATIONS USER ENTITY **/
