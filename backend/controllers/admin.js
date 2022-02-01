import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";


//@desc authenticate admin to login
//@route POST /api/admin
//@access Public

export const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (email === 'admin@namasys.co' && password === 'admin123') {
        res.json({
            email: email,
            token: generateToken(email),
        })
        
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})
