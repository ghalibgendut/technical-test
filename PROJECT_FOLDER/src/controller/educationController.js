const EducationModel = require('../model/education_model')
const ValidatorService = require('../service/validatorService')

class EducationController {

    static addEducation = async (req, res) => {
        try {

            const employee_id = req.body.employee_id
            const name = req.body.name
            const level = req.body.level
            const description = req.body.description
            const created_by = req.body.created_by
            const created_at = new Date()

            // check level valid or not
            const validLevel = ValidatorService.enumEducationValidator(level)
        
            if (!validLevel) {
                return res.status(400).json({message:'Level pendidikan yang dimasukan tidak valid!'})
            }
            else {
                
                // insert data to table education
                const educationData = await EducationModel.create({
                    employee_id, 
                    name, level, 
                    description, created_by, 
                    created_at
                })

                return res.status(201).json({message:`Data inserted!`, educationData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getOneEducation = async (req, res) => {
        try {

            const employee_id = req.params.employee_id

            const educationData = await EducationModel.findAll({where: {employee_id}})

            if (educationData.length == 0) {
                return res.status(404).json({message: 'Data not found!'})
            }
            else {
                return res.status(200).json({message: 'Data Retrived!', educationData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static getAllEducation = async  (req, res) => {
        try {
            const educationData = await EducationModel.findAll({})

            if (educationData.length == 0) {
                return res.status(404).json({message: 'Data not Found!'})
            }
            else {
                return res.status(200).json({message: 'Data Retrived!', educationData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
        
    }

    static updateEducation = async (req, res) => {
        try {
            const employee_id = req.params.employee_id
            const name = req.body.name
            let level = req.body.level
            const description = req.body.description
            const updated_by = req.body.updated_by
            const updated_at = new Date()

            const educationData = await EducationModel.findAll({
                where: {employee_id}
            })

            // check if data exist
            if (educationData.length == 0) {
                return res.status(404).json({message: 'Data not found!'})
            }
            else {
                const educationObj = educationData[0].get()
                level = level ? level : educationObj.level

                // check level valid or not
                const validLevel = ValidatorService.enumEducationValidator(level)
            
                if (!validLevel) {
                    return res.status(400).json({message:'Level pendidikan yang dimasukan tidak valid!'})
                }
                else {

                    // Update Education table
                    const updateEducationData = await EducationModel.update({
                        name: name ? name : educationObj.name,
                        level: level ? level : educationObj.level,
                        description: description ? description : educationObj.description,
                        updated_by,
                        updated_at
                    }, {
                        where: {employee_id}
                    })
                    return res.status(200).json({message:'Data updated!', updateEducationData})
                }
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }

    static deleteEducation = async (req, res) => {
        try {

            const employee_id = req.params.employee_id

            const educationData = await EducationModel.findAll({where: {employee_id}})

            if (educationData.length == 0) {
                return res.status(404).json({message: 'Data not found!'})
            }
            else {
                const deleteEducationData = await EducationModel.destroy({where:{employee_id}})

                return res.status(200).json({message: 'Data Retrived!', deleteEducationData})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Error!'})
        }
    }
 
}

module.exports = EducationController