import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            let token = req.headers.authorization.split(' ')[1]
            //console.log(token);
            jwt.verify(token, process.env.JWT_SECRET)
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized invalid token')
        }
    }
    else {
        throw new Error("Not authorized no token")
    }
})

export default protect