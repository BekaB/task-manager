const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

})

// mongoose.connect('mongodb://127.0.0.1:27017/', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of 10 if server is not reachable
// });

// const Study = new task({
//     description: 'Bible Study',
//     completed: true
// })

// Study.save().then(() => {
//     console.log(Study)
// }).catch((error) => {
//     console.log(error)
// })