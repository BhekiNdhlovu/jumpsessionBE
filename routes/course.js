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

// Get All Categories Route
router.get('/get-categories', async (req, res) => {
    try {
        const categories = await Course.findAll({ attributes: [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']})
        if(categories.length > 0) return res.json(categories)
 
        return res.json('Categories not available')
    } catch (err) {
        return res.status(400).json({ error: err})
    }
})

// Search Course by name, category, instructor Route
router.post('/search-course', async (req, res) => {
   try {
       const courses = await Course.findAll({
           where: {
                [Op.or]: [
                   { course_name : {
                        [Op.like]: `%${req.body.searchString}%`
                    }},
                    {instructor : {
                        [Op.like]: `%${req.body.searchString}%`
                    }},
                    {category : {
                        [Op.like]: `%${req.body.searchString}%`
                    }}
                ]
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

module.exports = router