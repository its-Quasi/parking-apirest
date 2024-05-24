import { Router } from 'express'
import { createUser, getUsers } from '../services/user.service'
import { checkRole } from '../utils/chekRole'

const router = Router()

router.route('/')
  .get(checkRole, getUsers)
  .post(checkRole, createUser)


export default router