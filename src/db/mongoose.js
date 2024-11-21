const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const task = new mongoose.model('task', {
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const Study = new task({
//     description: 'Bible Study',
//     completed: true
// })

// Study.save().then(() => {
//     console.log(Study)
// }).catch((error) => {
//     console.log(error)
// })