const express = require('express')
const app = express.Router()
const EmployeeController = require('../controller/employeeController')
const UploadMiddleware = require('../middleware/uploadMiddleware')


app.post('/add-employee', EmployeeController.addEmployee)
app.get('/employee-all', EmployeeController.getAllEmployee)
app.get('/employee-one/:id', EmployeeController.getOneEmployee)
app.put('/update-employee/:id', EmployeeController.updateEmployee)
app.delete('/delete-employee/:id', EmployeeController.deleteEmployee)
app.post('/add-employee-profile', UploadMiddleware.uploadFile.single('photoProfile'), EmployeeController.addEmployeeProfile)
app.get('/all-employee-profile', EmployeeController.getAllEmployeeProfile)
app.get('/one-employee-profile/:employee_id', EmployeeController.getOneEmployeeProfile)
app.put('/update-employee-profile/:employee_id', UploadMiddleware.uploadFile.single('photoProfile'), EmployeeController.updateEmployeeProfile)
app.delete('/delete-employee-profile/:employee_id', EmployeeController.deleteEmployeeProfile)

module.exports = app