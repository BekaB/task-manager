const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            Option:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }

        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        console.error(e)
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

// old code with many comments

// const express = require('express')
// const router = new express.Router()
// const auth = require('../middleware/auth')
// const Task = require('../models/task')

// router.post('/tasks', auth, async (req, res) => {
//     const task = new Task({
//         ...req.body,
//         owner: req.user._id
//     })

//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         //console.error(e) // Add logging for debug
//         res.status(400).send(e)
//     }
// })

// router.get('/tasks', auth, async (req, res) => {

//     try{
//         await req.user.populate('tasks').execPopulate()
//         res.send(req.user.tasks)
//         //const tasks = await Task.find({owner: req.user._id})
//         //res.send(tasks)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// router.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id

//     try{
//         const task = await Task.findOne({ _id, owner: req.user._id })

//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send(e)
//     }

//     // Task.findById(_id).then((task) => {
//     //     if(!task){
//     //         res.status(404).send()
//     //     }

//     //     res.send(task)
//     // }).catch((e) =>{
//     //     res.status(500).send(e)
//     // })
// })

// router.patch('/tasks/:id', async(req, res) => {
//     const updates = Object.keys(req.body)
//     const allwedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allwedUpdates.includes(update))

//     if(!isValidOperation){
//         res.status(400).send({error: 'invalid updates'})
//     }

//     try{
//         const task = await Task.findById(req.params.id)

//         updates.forEach((update) =>  task[update] = req.body[update])
//         await task.save()

//         //const user = User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         if(!task){
//             return res.status(404).send()
//         }

//         res.send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// router.delete('/tasks/:id', async(req, res) => {
//     const _id = req.body.id

//     try{
//         const task = await Task.findByIdAndDelete(_id)
//         if(!task){
//             res.status(404).send()
//         }

//         res.send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// module.exports = router