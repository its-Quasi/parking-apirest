import { Router } from 'express'
const router = Router()
import { createParking, deleteParking, getParkingById, getParkings, updateParking, getPartners, createPartner } from '../services/admin.service'

router.route('/partners')
  .post(createPartner)
  .get(getPartners)

router.route('/parkings')
  .post(createParking)
  .get(getParkings)

router.route('/parkings/:id')
  .get(getParkingById)
  .put(updateParking)
  .delete(deleteParking)

export default router