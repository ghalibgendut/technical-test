const Sequelize = require('sequelize')
const db = require('../../config/db/db.js')

// Define EmployeeModel
const EmployeeModel = db.define('employee',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nik: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    is_active: Sequelize.BOOLEAN,
    start_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATE,
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

module.exports = EmployeeModel
