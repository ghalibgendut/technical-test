const Sequelize = require('sequelize')
const db = require('../../config/db/db.js')

// Define EducationModel
const EducationModel = db.define('education', {
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
    level: {
        type: Sequelize.ENUM('TK', 'SD', 'SMP', 'SMA', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor')
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
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

// Associate EducationModel with EmployeeModel
EducationModel.associate = (models) => {
    EducationModel.belongsTo(models.EmployeeModel, {
        foreignKey: 'employee_id'
    })
}

module.exports = EducationModel