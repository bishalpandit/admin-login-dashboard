import express from 'express'
import { getUsers, createUser, deleteUser } from '../controllers/user.js'
import protect from '../middlewares/authMiddleware.js' 

const router = express.Router()

//@desc show all users
//@route GET /api/users/
//@access Protected
router.route('/').get(protect, getUsers)

//@desc creates a new user
//@route POST /api/users/create
//@access Protected
router.route('/create').post(protect, createUser)

//@desc delete a user by id
//@route DELETE /api/users/delete
//@access Protected
router.route('/delete/:id').delete(protect, deleteUser)

export default router
