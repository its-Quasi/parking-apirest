import { Router } from 'express'
import { login, logout } from '../services/auth.service'
import { getFirstTimeParkedVehicles, getTopVehiclesAcrossParkings, getTopVehiclesInParking, searchVehiclesByPrefixPlate } from '../services/indicators.service';
const router = Router()

router.get('/top-vehicles-across-parkings',  getTopVehiclesAcrossParkings)
router.get('/top-vehicles-in-parking/:parkingId',  getTopVehiclesInParking)
router.get('/first-time-parked-vehicles/:parkingId',  getFirstTimeParkedVehicles)
router.get('/search-by-substr/:platePrefix',  searchVehiclesByPrefixPlate)
export default router