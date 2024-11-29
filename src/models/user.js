const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email address is invalid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        require: true,
        minlength: 7,
        validate(value){
            if(validator.contains(value, 'password')){
                throw new Error('passowrd can not contain the word password')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a posetive number')
            }

        }
    }
})

userSchema.pre('save', async function (){
    const user = this

    if(user.isModified('password')){
        user.password = new bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User