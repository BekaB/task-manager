const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res, next) => {
//     res.status(503).send("under maintainance , come back later")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
    
app.listen(port, () => {
    console.log('server is on port ' + port)
})