import jwt from 'jsonwebtoken'

const generateToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET,{
        expiresIn: 60*5,
    })
}

export default generateToken;