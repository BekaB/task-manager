const mongoose = require('mongoose')

const task = new mongoose.model('tasks', {
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

module.exports = task