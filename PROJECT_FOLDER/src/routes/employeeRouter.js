const express = require('express')
const app = express.Router()
const EmployeeController = require('../controller/employeeController')


app.post('/add-employee', EmployeeController.addEmployee)
app.get('/employee-all', EmployeeController.getAllEmployee)
app.get('/employee-one/:id', EmployeeController.getOneEmployee)
app.put('/update-employee/:id', EmployeeController.updateEmployee)
app.delete('/delete-employee/:id', EmployeeController.deleteEmployee)

module.exports = app