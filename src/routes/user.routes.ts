import { Router } from 'express'
import { createUser, getUsers } from '../services/user.service'
import { checkRole } from '../utils/chekRole'
import { verifyToken } from '../middlewares/verifyToken'

const router = Router()

router.route('/')
  .get(getUsers)
  .post(createUser)


export default router