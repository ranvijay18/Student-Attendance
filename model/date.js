const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Date = sequelize.define('date',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },

    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
});


module.exports = Date;