const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { User } = require('../models')

router.post('/register', async (req, res) => {
    try {
        const existingUserName = await User.findOne({ where: { username: req.body.username } })
        const existingUserEmail = await User.findOne({ where: { email: req.body.email } })
        if(existingUserName && (existingUserName.username == req.body.username)) return res.json("Username already taken")
        if(existingUserEmail && (existingUserEmail.email == req.body.email)) return res.json("User already exists")

        const hash = bcrypt.hashSync(req.body.password, 10)
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        return res.json('User successfully registered')
    } catch (err) {
        return res.status(400).json({ error: err})
    }
})

router.post('/login', (req, res) => {
    return res.json('Testing login')
})

router.delete('/logout', (req, res) => {
    return res.json('Testing logout')
})

router.get('/profile', (req, res) => {
    return res.json('Testing profile')
})

module.exports = router