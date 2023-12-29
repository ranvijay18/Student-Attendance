const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Attendance = sequelize.define('attendance' , {
    present: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = Attendance;