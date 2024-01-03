const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const sequelize = require('./util/database')
const Student = require('./model/student');
const Attendance = require('./model/attendance');

const app = express();

const studentRouter = require('./route/student');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(studentRouter);




Attendance.belongsTo(Student, {
    onDelete: 'CASCADE', // delete attendance related to a deleted student
  });
  





sequelize.sync()
// .then(() => {
//     const student = Student.bulkCreate([
//         { name: 'Jane Smith'},
//         { name: 'Bob Johnson'},
//         { name: 'Ranvijay'},
//         { name: 'Taiyaba'},
//         { name: 'Nisha'},

//       ]);
//       return student;
// })
.then(() => {
    app.listen(8000);
})
.catch(err => {
    console.log(err);
})

