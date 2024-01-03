const Sequelize = require('sequelize');


const Student = require('../model/student');
const Attendance = require('../model/attendance');




exports.getStudents = (req, res, next) => {
    Student.findAll()
    .then((students) => {
        res.status(201).json(students);
    })
    .catch(err => {
        console.log(err);
    })
}
