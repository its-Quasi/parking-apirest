import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { IsNull, QueryFailedError } from "typeorm"
import { ParkingLog } from "../models/parkingLog"
import { Parking } from "../models/parking"
import { getHoursDiff } from "../utils/handlerTime"

const parkingLogRepository = AppDataSource.getRepository(ParkingLog)
const parkingRepository = AppDataSource.getRepository(Parking)
type action = 'entry' | 'exit'

export const createEntryRecord = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    //1. check if Vehicle is currently parked at another location
    let { vehiclePlate, parking } = req.body
    vehiclePlate = vehiclePlate.toUpperCase()
    const isAllocate = await isVehicleAllocate(vehiclePlate)
    if (isAllocate) {
      return res.status(422).send("Vehicle is currently parked at another location");
    }
    // 2. check available spaces
    const currParking = await parkingRepository.findOneBy({ id: parking.id })
    if (currParking?.avaliableSpaces === 0) {
      return res.status(400).send({
        mensaje: "No se puede Registrar Ingreso, no hay espacios disponibles"
      });
    }
    // 3. Save log
    const canSave = await saveLog(vehiclePlate, parking.id, 'entry')
    if (!canSave) return res.status(400).send()
    return res.status(204).send()
  } catch (error) {
    if (error instanceof QueryFailedError && error.driverError.code === '23503') {
      return res.status(500).send('The parking lot you are trying to enter does not exist.')
    }
    res.status(500).send({ message: 'Internal Server Error', error })
  }
}

function isVehicleAllocate(vehiclePlate: string) {
  return parkingLogRepository.findOne({
    where: {
      vehiclePlate,
      exitTime: IsNull()
    }
  })
}

export const createExitRecord = async (req: Request, res: Response) => {
  try {
    const { vehiclePlate, parking } = req.body
    const log = await parkingLogRepository.findOne({
      where: {
        vehiclePlate,
        parking: parking.id,
        exitTime: IsNull()
      }
    })
    if (!log) {
      return res.status(400).send({
        message: "No se puede Registrar Salida, no existe la placa en el parqueadero"
      })
    }
    // Save exit log and free up space
    const canSave = await saveLog(vehiclePlate, parking.id, 'exit')
    if (!canSave) return res.status(400).send()
    return res.status(204).send()
  } catch (error) {
    console.log(error)
    if (error instanceof QueryFailedError && error.driverError.code === '23503') {
      return res.status(500).send('The parking lot you are trying to enter does not exist.')
    }
    res.status(500).send(error)
  }
}

// Helper functions to modularize implementations

async function saveLog(vehiclePlate: string, parkingId: number, action: action) {
  let toUpdateLog: any = {
    vehiclePlate,
    parking: { id: parkingId }
  }
  console.log(vehiclePlate, parkingId)
  if (action === 'exit') {
    toUpdateLog = await parkingLogRepository.findOne({
      where: {
        vehiclePlate,
        parking: { id: parkingId },
        exitTime: IsNull()
      }
    })
  }
  // ===> client gives a plate that is not found in the parking [AT EXIT MOMENT].
  if (!toUpdateLog) return false
  if (action === 'entry') toUpdateLog.entryTime = new Date()
  else {
    toUpdateLog.exitTime = new Date()
    const park = await parkingRepository.findOne({
      where: {
        id: parkingId
      },
      select: {
        priceByHour: true
      }
    })
    let profit = park!.priceByHour * getHoursDiff(toUpdateLog.entryTime, toUpdateLog.exitTime)
    if(profit === 0) profit++
    toUpdateLog.profit = profit
  }
  await parkingLogRepository.save(toUpdateLog)
  await updateAvailableSpaces(parkingId, action)
  return true
}

async function updateAvailableSpaces(id: number, action: action) {
  const parkingToAllocate = await parkingRepository.findOneBy({ id })
  if (action === 'entry') parkingToAllocate!.avaliableSpaces--
  else parkingToAllocate!.avaliableSpaces++
  await parkingRepository.save(parkingToAllocate!)
}
