const Sequelize = require('sequelize')
const db = require('../../config/db/db.js')
const EmployeeModel = require('./employee_model.js')

// Define EmployeeFamilyModel
const EmployeeFamilyModel = db.define('employee_family', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employee_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'employee',
            key: 'id'
        }
    },
    name: Sequelize.STRING(255),
    identifier: Sequelize.STRING(255),
    job: Sequelize.STRING(255),
    place_of_birth: Sequelize.STRING(255),
    date_of_birth: Sequelize.DATE,
    religion: Sequelize.ENUM('Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'),
    is_life: Sequelize.BOOLEAN,
    is_divorced: Sequelize.BOOLEAN,
    relation_status: Sequelize.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
    created_by: Sequelize.STRING(255),
    updated_by: Sequelize.STRING(255),
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true
})

// Associate EmployeeFamilyModel with EmployeeModel
// EmployeeFamilyModel.associate = (models) => {
//     EmployeeFamilyModel.belongsTo(models.EmployeeModel, {
//         foreignKey: 'employee_id'
//     })
// }

EmployeeModel.hasMany(EmployeeFamilyModel, {
    foreignKey: 'employee_id'
})

module.exports = EmployeeFamilyModel