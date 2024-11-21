const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('Users', {
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

const me = new User({
    name: 'Jesus',
    email: 'god@incarnate.COM    '
})

me.save().then(() => {
    console.log(me)
}).catch((error) =>{
    console.log(error)
})

const task = new mongoose.model('task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const Study = new task({
    description: 'Bible Study',
    completed: true
})

Study.save().then(() => {
    console.log(Study)
}).catch((error) => {
    console.log(error)
})