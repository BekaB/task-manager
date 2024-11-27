require('../src/db/mongoose')
const User = require('../src/models/user')

//673e708b8e32fe866409efad

// User.findByIdAndUpdate('673fc1dbc65cc472384ce29b', {age: 35}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 35})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    console.log(count)
}

updateAgeAndCount('673e80bc581fd32ab05391ff', 17).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})