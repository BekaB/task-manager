const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// const taskSchema = mongoose.Schema({
//     description: {
//         type: String,
//         require: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         require: true
//     }
// })

// taskSchema.pre('task', async function() {
//     const task = this

// })

// const task = new mongoose.model('tasks', taskSchema)

// module.exports = task