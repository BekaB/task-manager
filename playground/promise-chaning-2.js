require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('673fc2debb2abc815c55bb10').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})