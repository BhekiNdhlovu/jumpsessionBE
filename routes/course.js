const express = require('express')
const router = express.Router()

// Search Course Route
router.post('/search-course', (req, res) => {
    return res.json('Testing search course')
})

// Get All Courses Route
router.get('/get-all', (req, res) => {
    return res.json('Testing get all course')
})

module.exports = router