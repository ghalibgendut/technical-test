const EmployeeModel = require('../model/employee_model')
const EmployeeProfileModel = require('../model/employee_profile_model')
const EmployeeFamilyModel = require('../model/employee_family_model')
const EducationModel = require('../model/education_model')
const {sequelize} = require('sequelize')
// const {Op, Sequelize} = require('sequelize')
const moment = require('moment')
const path = require('path')
const sharp = require('sharp')
const filePath = path.join(__dirname, '../../assets')
const ValidatorService = require('../service/validatorService')
const db = require('../../config/db/db.js')


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


    static addEmployeeFamily = async (req, res) => {
        try {
            
            const employee_id = req.body.employee_id
            const name = req.body.name
            const identifier = req.body.identifier
            const job = req.body.job
            const placeOfBirth = req.body.placeOfBirth
            const dateOfBirth = new Date(req.body.dateOfBirth)
            const religion = req.body.religion
            const is_life = req.body.is_life
            const is_divorced = req.body.is_divorced
            const relation_status = req.body.relation_status
            const created_by = req.body.created_by
            const created_at = new Date()

            // check if religion valid or not
            const validReligion = ValidatorService.enumReligionValidator(religion)
            if (!validReligion) {
                return res.status(400).json({message: `Data Agama yang anda masukan tidak valid!`})
            }

            // check if relation valid or not
            const validRelation = ValidatorService.enumRelationValidator(relation_status)
            if (!validRelation) {
                return res.status(400).json({message: `Data Relasi yang anda masukan tidak valid!`})
            }

            // insert to table employee family
            const employeeData = await EmployeeFamilyModel.create({
                employee_id,
                name,
                identifier,
                job,
                place_of_birth: placeOfBirth,
                date_of_birth: dateOfBirth,
                religion,
                is_life,
                is_divorced,
                relation_status,
                created_by,
                created_at
            })

            return res.status(201).json({message: `Data Inserted!`, employeeData})

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getAllEmployeeFamily = async (req, res) => {
        try {

            const employeeData = await EmployeeFamilyModel.findAll({})

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

    static getOneEmployeeFamily = async (req, res) => {
        try {

            const employee_id = req.params.employee_id

            const employeeData = await EmployeeFamilyModel.findAll({where: {employee_id}})

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

    static updateEmployeeFamily = async (req, res) => {
        try {

            const employee_id = req.params.employee_id
            const name = req.body.name
            const identifier = req.body.identifier
            const job = req.body.job
            const placeOfBirth = req.body.placeOfBirth
            const dateOfBirth = new Date(req.body.dateOfBirth)
            let religion = req.body.religion
            const is_life = req.body.is_life
            const is_divorced = req.body.is_divorced
            let relation_status = req.body.relation_status
            const updated_by = req.body.updated_by
            const updated_at = new Date()
            
            const employeeData = await EmployeeFamilyModel.findAll({where: {employee_id}})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                const employeeObj = employeeData[0].get()

                religion = religion ? religion : employeeObj.religion
                relation_status = relation_status ? relation_status : employeeObj.relation_status

                // check if religion valid or not
                const validReligion = ValidatorService.enumReligionValidator(religion)
                if (!validReligion) {
                    return res.status(400).json({message: `Data Agama yang anda masukan tidak valid!`})
                }

                // check if relation valid or not
                const validRelation = ValidatorService.enumRelationValidator(relation_status)
                if (!validRelation) {
                    return res.status(400).json({message: `Data Relasi yang anda masukan tidak valid!`})
                }
                
                console.log('Semua data OK');

                const employeeFamilyData = await EmployeeFamilyModel.update({
                    employee_id,
                    name: name ? name : employeeObj.name,
                    identifier: identifier ? identifier: employeeObj.identifier,
                    job: job ? job : employeeObj.job,
                    place_of_birth: placeOfBirth ? placeOfBirth : employeeObj.place_of_birth,
                    date_of_birth: dateOfBirth ? dateOfBirth : employeeObj.date_of_birth,
                    religion,
                    is_life: is_life ? is_life : employeeObj.is_life,
                    is_divorced: is_divorced ? is_divorced : employeeObj.is_divorced,
                    relation_status,
                    updated_by,
                    updated_at
                }, {where: {employee_id}})
    
                return res.status(201).json({message: `Data Updated!`, employeeFamilyData})
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }
    
    static deleteEmployeeFamily = async (req, res) => {
        try {

            const employee_id = req.params.employee_id

            const employeeData = await EmployeeFamilyModel.findAll({where: {employee_id}})

            // Check if data exist
            if (employeeData.length == 0) {
                return res.status(404).json({message: `Data not Found!`})
            }
            else {
                const deleteEmployeeFamilyData = await EmployeeFamilyModel.destroy({where:{employee_id}})

                return res.status(200).json({message:'Data Deleted!', deleteEmployeeFamilyData})
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getEmployeeDetail = async (req, res) => {
        try {

            const employeeData = await EmployeeModel.findAll({
                include: [
                    {model: EmployeeProfileModel},
                    {model: EducationModel},
                    {model: EmployeeFamilyModel}
                ]
            })

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

    static getOneEmployeeDetail = async (req, res) => {
        try {
            
            const employee_id = req.params.employee_id

            const employeeData = await EmployeeModel.findOne({
                include: [
                    {model: EmployeeProfileModel},
                    {model: EducationModel},
                    {model: EmployeeFamilyModel}
                ],
                where: {id: employee_id}
            })

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

    static getReport = async (req, res) => {
        try {
            
            const employeeData = await EmployeeModel.sequelize.query(
               `
               select e.id as employee_id, nik, e.name, is_active, ep.gender as gender, 
               age(ep.date_of_birth::date) as umur, ed.name as school_name,
               ed.level as level,
               case 
                   when (suami != 0 and anak != 0) then concat(suami, ' suami & ',anak,' anak') 
                   when (istri != 0 and anak != 0) then concat(istri, ' istri & ',anak,' anak')
                   when (suami != 0 and anak = 0) then concat (suami, ' suami')
                   when (istri != 0 and anak = 0) then concat (istri, ' istri')
                   when (suami = 0 or istri = 0) and (anak != 0 ) then concat(anak, ' anak')
                   else '-'
               end as family_realtion
                from employee e 
                left join employee_profile ep on e.id = ep.employee_id
                left join education ed ON e.id = ed.employee_id
                left join (
                        select employee_id, sum(suami) as suami, sum(istri) as istri, sum(anak) as anak
                            
                        from (select employee_id, 
                        case relation_status
                                when 'Suami' then 1
                            else 0
                        end as Suami,
                        case relation_status
                            when 'Istri' then 1
                            else 0
                        end as Istri,
                        case relation_status
                            when 'Anak' then 1
                                else 0
                            end as Anak from employee_family ef) as f
                            group by 1
                    )  as family  on family.employee_id = e.id`
            )

            const dataReport = employeeData[0]

            return res.status(200).json({message:`Data Retrived!`, dataReport})

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

}

module.exports = EmployeeController