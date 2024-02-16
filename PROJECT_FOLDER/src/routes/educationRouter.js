const express = require('express')
const app = express.Router()
const EducationController = require('../controller/educationController')


app.post('/add-education', EducationController.addEducation)
app.get('/education-all', EducationController.getAllEducation)
app.get('/one-educaton/:employee_id', EducationController.getOneEducation)
app.put('/update-education/:employee_id', EducationController.updateEducation)

module.exports = app