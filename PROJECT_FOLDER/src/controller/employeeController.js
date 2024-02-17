const EmployeeModel = require('../model/employee_model')
const EmployeeProfileModel = require('../model/employee_profile_model')
const Sequelize = require('sequelize')
const moment = require('moment')
const path = require('path')
const sharp = require('sharp')
const filePath = path.join(__dirname, '../../assets')
const ValidatorService = require('../service/validatorService')


class EmployeeController {

    static addEmployee = async (req, res) => {
        try {
    
            const nik = req.body.nik
            const name = req.body.name
            const is_active = req.body.is_active
            const start_date = new Date(req.body.start_date)
            const end_date = new Date(req.body.end_date)
            const created_by = req.body.created_by
            const created_at = new Date()

            // insert data to employee table
            const employeeData = await EmployeeModel.create({
                nik, name, 
                is_active, start_date, 
                end_date, created_by, 
                created_at
            })

            return res.status(201).json({message:`Data inserted!`, employeeData})
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getAllEmployee = async (req, res) => {
        try {
            const employeeData = await EmployeeModel.findAll({
                attributes:['id', 'nik', 'is_active', 'start_date', 'end_date', 'created_at', 'created_by']
            })

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message:`Data not Found!`})
            }
            else {
                res.status(200).json({message: 'Data Retrived!', employeeData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getOneEmployee = async (req, res) => {
        try {

            const id = req.params.id

            const employeeData = await EmployeeModel.findAll({
                attributes: ['id', 'nik', 'is_active', 'start_date', 'end_date', 'created_at', 'created_by'],
                where: {id}
            })

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                return res.status(200).json({message: `Data Retrived!`, employeeData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static updateEmployee = async (req, res) => {
        try {
            const id = req.params.id

            const nik = req.body.nik
            const name = req.body.name
            const is_active = req.body.is_active
            const start_date = req.body.start_date ? new Date(req.body.start_date) : ""
            const end_date = req.body.end_date? new Date(req.body.end_date) : ""
            const updated_by = req.body.updated_by
            const updated_at = new Date()

            const employeeData = await EmployeeModel.findAll({where: {id}}) // this is use not only to check data, also used for data value when updatin

            // check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                const employeeObj = employeeData[0].get() //get the employee data

                // update employee table
                const updateEmployeeData = await EmployeeModel.update(
                    {
                        nik: nik ? nik : employeeObj.nik,
                        name: name ? name : employeeObj.name,
                        is_active: is_active ? is_active : employeeObj.is_active,
                        start_date: start_date ? start_date : employeeObj.start_date,
                        end_date: end_date ? end_date : employeeObj.end_date,
                        updated_by,
                        updated_at
                    },{
                        where: {id}
                    }
                )
                
                res.status(200).json({message: `Data updated!`, updateEmployeeData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }
    
    static deleteEmployee = async (req, res) => {
        try {
            
            const id = req.params.id

            const employeeData = await EmployeeModel.findAll({where: {id}})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                const deleteEmployeeData = await EmployeeModel.destroy({where:{id}})

                return res.status(200).json({message:'Data Deleted!', deleteEmployeeData})
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static addEmployeeProfile = async (req, res) => {
        try {

            const employee_id = req.body.employee_id
            let fileName = req.file.filename
            const path = `/assets/${fileName}` //used to store in db
            const placeOfBirth = req.body.placeOfBirth
            const dateOfBirth = new Date(req.body.dateOfBirth)
            const gender = req.body.gender
            const is_married = req.body.is_married
            const created_by = req.body.created_by
            const created_at = new Date()


            // check gender valid or not
            const validGender = ValidatorService.enumGenderValidator(gender)
            if (!validGender) {
                return res.status(400).json({message: `Gender yang anda masukan tidak valid!`})
            }
            else {

                // insert to employee tabel
                const employeeData = await EmployeeProfileModel.create({
                    employee_id,
                    place_of_birth: placeOfBirth,
                    date_of_birth: dateOfBirth,
                    gender,
                    is_married,
                    prof_pict: path,
                    created_by,
                    created_at
                })
                return res.status(201).json({message: `Data inserted!`, employeeData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getAllEmployeeProfile = async (req, res) => {
        try {

            const employeeData = await EmployeeProfileModel.findAll({})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message:`Data not Found!`})
            }
            else {
                res.status(200).json({message: 'Data Retrived!', employeeData})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getOneEmployeeProfile = async (req, res) => {
        try {
            const employee_id = req.params.employee_id

            const employeeData = await EmployeeProfileModel.findAll({where: {employee_id}})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message:`Data not Found!`})
            }
            else {
                res.status(200).json({message: 'Data Retrived!', employeeData})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static updateEmployeeProfile = async (req, res) => {
        try {
            const employee_id = req.params.employee_id
            let fileName = req.file.filename
            const path = `/assets/${fileName}` //used to store in db
            const placeOfBirth = req.body.placeOfBirth
            const dateOfBirth = new Date(req.body.dateOfBirth)
            let gender = req.body.gender
            const is_married = req.body.is_married
            const updated_by = req.body.created_at
            const updated_at = new Date()

            const employeeData = await EmployeeProfileModel.findAll({where:{employee_id}})

            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not found!`})
            }
            else {
                const employeeObj = employeeData[0].get()
                gender = gender ? gender : employeeObj.gender

                // check if gender valid or not
                const validGender = ValidatorService.enumGenderValidator(gender)

                if (!validGender) {
                    return res.status(400).json({message: `Gender yang anda masukan tidak valid!`})
                }
                else {

                    // console.log(employeeObj);
                    
                    // update employee profile table
                    const employeProfileData = await EmployeeProfileModel.update({
                        place_of_birth: placeOfBirth ? placeOfBirth : employeeObj.place_of_birth,
                        date_of_birth: dateOfBirth ? dateOfBirth : employeeObj.date_of_birth,
                        gender,
                        is_married,
                        prof_pict: path,
                        updated_by,
                        updated_at
                    }, {where: {employee_id}})

                    return res.status(200).json({message:`Data updated!`, employeProfileData})
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static deleteEmployeeProfile = async (req, res) => {
        try {
            
            const employee_id = req.params.employee_id

            const employeeData = await EmployeeProfileModel.findAll({where: {employee_id}})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                const deleteEmployeeProfileData = await EmployeeProfileModel.destroy({where:{employee_id}})

                return res.status(200).json({message:'Data Deleted!', deleteEmployeeProfileData})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }
    
}

module.exports = EmployeeController