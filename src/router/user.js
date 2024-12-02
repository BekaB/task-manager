const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        //console.error(e) // Add logging for debug
        res.status(404).send(e)
    }


//     user.save().then(() => {
//         res.status(201).res.send(user)
//     }).catch((e) => {
//         res.status(400).send(e)    
//     })
 })

 router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)

        res.send(user)
    }catch(e){

    }
 })

router.get('/users', async (req, res) => {

    try{
        const user = await User.find({})
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            console.log(req.params.id)
            return res.status(404).send('i dont know whhhhhttt')
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allwedUpdates = ['name', 'email','age', 'password']
    const isValidOperation = updates.every((update) => allwedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error: 'invalid updates'})
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        //const user = User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    const _id = req.body.id

    try{
        const user = User.findByIdAndDelete(_id)
        if(!user){
            res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router