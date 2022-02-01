import express from 'express'
import { authAdmin } from '../controllers/admin.js' 

const router = express.Router()

//@desc creates a new user
//@route POST /api/users/create
//@access Protected
router.post('/', authAdmin)

export default router