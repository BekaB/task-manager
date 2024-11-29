const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const taskSchema = mongoose.Schema({
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

taskSchema.pre('task', async function() {
    const task = this

})

const task = new mongoose.model('tasks', taskSchema)

module.exports = task