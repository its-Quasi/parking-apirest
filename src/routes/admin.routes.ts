import { Router } from 'express'
const router = Router()
import { createUser, getUsers } from '../services/user.service'

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
  .post()
  .get()
  .put()
  .delete()

  router.route('/parkings/:id')
  .get()
  .put()
  .delete()

export default router