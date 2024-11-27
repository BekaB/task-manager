require('../src/db/mongoose')
const User = require('../src/models/user')

//673e708b8e32fe866409efad

User.findByIdAndUpdate('673fc1dbc65cc472384ce29b', {age: 35}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 35})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})