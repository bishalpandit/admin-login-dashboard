import userModel from "../models/user.js"
import asyncHandler from "express-async-handler";

//@desc get all users
//@route GET /api/users/
//@access Protected

export const getUsers = asyncHandler(async (req, res) => {

    const users = await userModel.find({});

    if (users)
        res.json(users)
    else {
        res.status(404)
        throw new Error('No users found!')
    }
})


//@desc create new user
//@route POST /api/users/create
//@access Protected

export const createUser = asyncHandler(async (req, res) => {

    const userData = req.body;
    const { email } = userData
    const userExists = await userModel.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    try {

        const user = await userModel.create(userData)

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                mobile: user.mobile,
                email: user.email,
                address: user.address,
            })
        }

    } catch (err) {
        res.status(400)
        throw err;
    }



})

//@desc delete a user by id
//@route GET /api/users/delete
//@access Protected

export const deleteUser = asyncHandler(async (req, res) => {
    const userDoc = await userModel.findById(req.params.id)

    if (userDoc) {

        await userDoc.remove()
        res.json({ message: 'User deleted' })

    } else {
        
        res.status(404)
        throw new Error('User not found')
    }

})