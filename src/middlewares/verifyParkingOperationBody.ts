import { NextFunction, Request, Response } from "express";
import { validateVehiclePlate } from "../utils/plateValidator";

export const verifyBodyInfo = (req: Request, res: Response, next: NextFunction) => {
  console.log('checkBodyInfo')
  const { vehiclePlate, parking } = req.body
  if (!vehiclePlate || !parking.id) {
    return res.status(401).send("Vehicle plates or Parking Id not provided");
  }
  
  const isValidPlate = validateVehiclePlate(vehiclePlate)
  if (!isValidPlate) {
    return res.status(401).send("Vehicle plates are not valids")
  }
  next()
}