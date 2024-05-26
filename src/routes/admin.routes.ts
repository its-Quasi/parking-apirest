import { Router } from 'express'
const router = Router()
import { createUser, getUsers } from '../services/user.service'
import { createParking, deleteParking, getParkingById, getParkings, updateParking } from '../services/admin.service'

// routes about users operations
router.route('/users')
  .post(createUser)
  .get(getUsers)

router.route('/users/:id')
  .put() // update user 
  .get() // get user by email
  .delete() // delete user, and parks?


// routes about parking operations
router.route('/parkings')
  .post(createParking)
  .get(getParkings)

  router.route('/parkings/:id')
  .get(getParkingById)
  .put(updateParking)
  .delete(deleteParking)

export default router