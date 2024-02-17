const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('data_kepegawaian', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

module.exports = sequelize