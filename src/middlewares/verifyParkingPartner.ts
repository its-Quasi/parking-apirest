import { Response, Request, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Parking } from "../models/parking"
import { Role } from "../utils/role"

const parkingRepository = AppDataSource.getRepository(Parking)

export const verifyParkingPartner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('checking parking partner')
    const { user } = req
    let { parking } = req.body
    const currParking = await parkingRepository.findOne({
      where: {
        id: parking.id,
        partner: {
          email: user.email
        }
      },
      relations: ['partner']
    })
    if (!parking.id) {
      return res.status(400).send(`Parking With ID ${parking.id} not exists`)
    }

    if (currParking?.partner.email !== user.email) {
      return res.status(401).send(`${user.email} is not partner of this parking`)
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}