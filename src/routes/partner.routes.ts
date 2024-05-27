import { Router } from 'express'
import { createEntryRecord, createExitRecord } from '../services/partner.service'
import { verifyBodyInfo } from '../middlewares/verifyParkingOperationBody'
import { verifyParkingPartner } from '../middlewares/verifyParkingPartner'
const router = Router()

router.post('/entry', [verifyBodyInfo, verifyParkingPartner], createEntryRecord)
router.post('/exit', [verifyBodyInfo, verifyParkingPartner], createExitRecord)

export default router