exports.postAttendance = (req, res ,next) => {
     Attendance.bulkCreate(req.body)
     .then((data) => {
      // console.log(data[0]);
        res.status(201).json(data);
     })
     
}

exports.getAttendance = (req, res, next) => {
   Attendance.findAll()
   .then((data) => {
      if(data){
         res.status(201).json(data);
      }
      else{
         res.status(201).json(false);
      }
   })
   .catch(err => {
      console.log(err);
   })
}
