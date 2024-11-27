require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('673fc2debb2abc815c55bb10').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    console.log(count)
}

deleteTaskCount('673e7218de0e7f43942f1fc9').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})