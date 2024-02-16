const Sequelize = require('sequelize')
const db = require('../../config/db/db.js')

// Define EmployeeProfileModel
const EmployeeProfileModel = db.define('employee_profile', {
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
    place_of_birth: Sequelize.STRING,
    date_of_birth: Sequelize.STRING,
    gender: Sequelize.ENUM('Laki-laki', 'Perempuan'),
    is_married: Sequelize.BOOLEAN,
    prof_pict: Sequelize.STRING(255),
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

// Associate EmployeeProfileModel with EmployeeModel
EmployeeProfileModel.associate = (models) => {
    EmployeeProfileModel.belongsTo(models.EmployeeModel, {
        foreignKey: 'employee_id'
    })
}

module.exports = EmployeeProfileModel