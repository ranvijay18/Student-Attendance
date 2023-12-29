const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const sequelize = require('./util/database')
const Student = require('./model/student');
const Date = require('./model/date');
const Attendance = require('./model/attendance');

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());




Student.belongsTo(Date, {through: Attendance});
Date.belongsTo(Student, {through : Attendance});
Student.hasMany(Attendance);
Attendance.belongsTo(Student);
Date.hasMany(Attendance);
Attendance.belongsTo(Date);





sequelize.sync()
.then(() => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
})


