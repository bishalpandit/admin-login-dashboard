import mongoose from 'mongoose'
import validator from 'validator'

const { Schema } = mongoose

const validateMobile = (mob) => {

    for (let i = 0; i < mob.length; i++) {
        const asciiCode = mob.charCodeAt(i);
        if (asciiCode < 48 || asciiCode > 57)
            return false;
    }

    if (mob.length !== 10)
        return false;

    return true;
}

const validateUsername = (username) => {


    for (let i = 0; i < username.length; i++) {

        let ch = username.charCodeAt(i)

        if (ch == 32) // Space
            return false;

        // Check for alphanumeric values
        if ((ch >= 48 && ch <= 57) || (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122)) {
            continue;
        }

        return false;
    }

    return true;
}

// alpha numeric || no spaces
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [(val) => validateUsername(val), 'Enter only alhphanumeric values with no spaces']
    }, // No spaces and only alphanumeric chars
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: [(val) => validateMobile(val), 'Please enter a valid mobile phone']

    }, // Only 10 digit
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    }, // Email validation
    address: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

// Validators

const userModel = new mongoose.model('User', userSchema)

export default userModel;