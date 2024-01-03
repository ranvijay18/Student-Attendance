const express = require('express');

const router = express.Router();


const studentController = require('../controller/student');
const attendanceController = require('../controller/attendance');


router.post('/date', attendanceController.postDate);


router.get('/student' , studentController.getStudents);

router.post('/student-attendance', attendanceController.postAttendance);

router.get('/attendance', attendanceController.getAttendance);





module.exports = router;
