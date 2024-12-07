const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        //console.error(e) // Add logging for debug
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).semd(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) =>{
    //     res.status(500).send(e)
    // })
})

router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allwedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allwedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: 'invalid updates'})
    }

    try{
        const task = await Task.findById(req.params.id)

        updates.forEach((update) =>  task[update] = req.body[update])
        await task.save()

        //const user = User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async(req, res) => {
    const _id = req.body.id

    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router