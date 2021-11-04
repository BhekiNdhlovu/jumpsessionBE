const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const Op = Sequelize.Op

const { Course } = require('../models')

// Get All Courses Route
router.get('/get-all', async (req, res) => {
    try {
        const courses = await Course.findAll()
        if(courses.length > 0) return res.json(courses)
 
        return res.json('No courses available')
    } catch (err) {
        return res.status(400).json({ error: err})
    }
})

// Search Course Route
router.post('/search-course', async (req, res) => {
   try {
       const courses = await Course.findAll({
           where: {
                course_name : {
                    [Op.like]: `%${req.body.searchString}%`
                }
            },
            offset: req.body.count,
            limit: req.body.limit
        })
       if(courses.length > 0) return res.json(courses)

       return res.json('No courses available')
   } catch (err) {
       return res.status(400).json({ error: err})
   }
})

// Find Course by Category
router.post('/get-course-by-category', async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: {
                category : {
                     [Op.like]: `%${req.body.category}%`
                 }
             },
             offset: req.body.count,
             limit: req.body.limit
         })
        if(courses.length > 0) return res.json(courses)
 
        return res.json(`No courses found for ${req.body.category}`)
    } catch (err) {
        return res.status(400).json({ error: err})
    }
})

// Find Course by Instructor
router.post('/get-course-by-instructor', async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: {
                instructor : {
                     [Op.like]: `%${req.body.instructor}%`
                 }
             },
             offset: req.body.count,
             limit: req.body.limit
         })
        if(courses.length > 0) return res.json(courses)
 
        return res.json(`No courses found by ${req.body.instructor}`)
    } catch (err) {
        return res.status(400).json({ error: err})
    }
})

// New Course Route
router.post('/new-course', async (req, res) => {
    try {
        const course = await Course.create({
            instructor: req.body.instructor,
            course_name: req.body.course_name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price
        })

        return res.json(course)
    } catch (error) {
        return res.status(400).json('Invalid input')
    }
})

module.exports = router