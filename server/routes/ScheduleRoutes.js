const getAllSchedulesByStore= require("../../model/scheduleModel");

let express = require("express");
let router = express.Router();
const moment = require('moment');

const FromatingSchedData = (data)=>{
  const res = [];
  data.map((emp) => {
    const dataObj = {
      userId: emp.User_idUser,
      firstname: emp.user.firstname,
      lastname: emp.user.lastname,
      position: emp.userprofile.name,
      schedules: emp.user.schedule,
    };
    emp.user.inactive === false && res.push(dataObj);
  });
  return res
}
//Get all schedules in a period in a store
router.get("/week", async (req, res) => {
  //All employee Schedule
  const storeId = req.query.storeId * 1;
  const startDayofWeek = req.query.startDay;
  const endDayofWeek = moment(startDayofWeek,"YYYY-MM-DD").clone().endOf("week").format();
  console.log("period", new Date(startDayofWeek), endDayofWeek);

  const allSchedules = await getAllSchedulesByStore(
    storeId,
    startDayofWeek,
    endDayofWeek
  );

  const weekSchedData = FromatingSchedData(allSchedules)

  res.json(weekSchedData);
});

router.get('/day', async(req,res)=>{
  //All emplyees schedules
  const storeId = req.query.storeId*1;
  const day=req.query.day;
  
  const startDay = moment(day,"YYYY-MM-DD").clone().startOf('day').format();
  const endDay = moment(day,"YYYY-MM-DD").clone().endOf('day').format();
  console.log('getting data from '+startDay+'to'+endDay)
  const dayScheds = await getAllSchedulesByStore(storeId, startDay, endDay);
  const daySchedsData = FromatingSchedData(dayScheds);
  res.json(daySchedsData)
})

// router.get('/storeHrs', async(req,res)=>{

//   const storeId = req.query.storeId*1;
//   const date = req.query.date;
//   console.log(`Getting Store hours data in ${storeId} at ${date}`)
//   const storeHrs = await getStoreHours(storeId);
//   console.log("storeHrs", storeHrs)
// })

module.exports = router;
