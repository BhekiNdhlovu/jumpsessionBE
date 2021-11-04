const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { User } = require('../models')
const { createTokens, validateToken, destroyToken } = require('../middleware/custom-auth')

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

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) return res.status(400).json('1 Invalid username or password')

    try {
        const user = await User.findOne({ where: { username: username } })
        if(!user) return res.status(400).json('User doesn\'t exist')

        const dbPassword = user.password

        const passwordMatch = (await bcrypt.compare(password, dbPassword)).valueOf()
        if(!passwordMatch) return res.status(400).json('2 Invalid username or password')
        
        const accessToken = createTokens(user)
        res.cookie('access-token', accessToken, {
            maxAge: 60*30*1000
        })

        return res.json('User logged in')
    } catch (err) {
        return res.status(400).json('3 Invalid username or password')
    }
})

router.delete('/logout', (req, res) => {
    return res.json('Testing logout')
})

router.get('/profile', (req, res) => {
    return res.json('Testing profile')
})

module.exports = router