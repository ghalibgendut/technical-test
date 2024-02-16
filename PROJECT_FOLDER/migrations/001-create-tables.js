module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async (transac) => {
            // Create table employee
            await queryInterface.createTable('employee', {
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
            }, { transaction: transac }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            })

            // Create table employee_profile
            await queryInterface.createTable('employee_profile', {
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
            }, { transaction: transac }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            })

            // create table education
            await queryInterface.createTable('education', {
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
            }, { transaction: transac }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            })

            // create table employee_family
            await queryInterface.createTable('employee_family', {
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
            }, { transaction: transac }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            })
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.dropTable('employee_family', { transaction: t }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            });
            await queryInterface.dropTable('education', { transaction: t }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            });
            await queryInterface.dropTable('employee_profile', { transaction: t }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            });
            await queryInterface.dropTable('employee', { transaction: t }, {
                //prevent sequelize transform table name into plural
                freezeTableName: true
            });
        })
    }
}