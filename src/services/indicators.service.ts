import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { ParkingLog } from "../models/parkingLog";
import { IsNull, Like } from 'typeorm'

const parkingLogRepository = AppDataSource.getRepository(ParkingLog)

export const getTopVehiclesAcrossParkings = async (req: Request, res: Response) => {
  const topVehicles = await parkingLogRepository
    .createQueryBuilder('parkingLog')
    .select('parkingLog.vehiclePlate', 'placa')
    .addSelect('COUNT(parkingLog.vehiclePlate)', 'registros')
    .groupBy('parkingLog.vehiclePlate')
    .orderBy('registros', 'DESC')
    .limit(10)
    .getRawMany();

  return res.json(topVehicles)
}
export const getTopVehiclesInParking = async (req: Request, res: Response) => {
  const { parkingId } = req.params
  const topVehicles = await parkingLogRepository
    .createQueryBuilder('parkingLog')
    .select('parkingLog.vehiclePlate', 'placa')
    .addSelect('COUNT(parkingLog.vehiclePlate)', 'registros')
    .where('parkingLog.parkingId = :parkingId', { parkingId })
    .groupBy('parkingLog.vehiclePlate')
    .orderBy('registros', 'DESC')
    .limit(10)
    .getRawMany();

  return res.json(topVehicles);
}
export const getFirstTimeParkedVehicles = async (req: Request, res: Response) => {
  const { parkingId } = req.params
  const firstTimeVehicles = await parkingLogRepository
    .createQueryBuilder('parkingLog')
    .select('parkingLog.vehiclePlate', 'vehiclePlate')
    .where('parkingLog.parkingId = :parkingId', { parkingId })
    .andWhere('parkingLog.exitTime IS NULL')
    .groupBy('parkingLog.vehiclePlate')
    .having('COUNT(parkingLog.id) = 1')
    .getRawMany();

  return res.json(firstTimeVehicles);
}


export const searchVehiclesByPrefixPlate = async (req: Request, res: Response) => {
  try {
    const substr = (req.params.platePrefix) as string

    if (!substr) {
      return res.status(400).json({ message: 'Plate prefix is required' });
    }

    const vehicles = await parkingLogRepository.find({
      where: {
        vehiclePlate: Like(`%${substr}%`),
        exitTime: IsNull(),
      },
      select : {
        vehiclePlate : true,
        entryTime : true
      }
    });
    return res.json({ vehicles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};