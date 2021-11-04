const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
    return res.json('Testing register')
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